import axios, { AxiosInstance } from 'axios';
import type { AnalyticsConfig, AnalyticsEvent } from '@/types/analytics';

interface BatchResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    eventId: string;
    error: string;
  }>;
}

export class BatchProcessor {
  private config: AnalyticsConfig;
  private httpClient: AxiosInstance;
  private retryQueue: Map<string, { event: AnalyticsEvent; attempts: number }> = new Map();
  private maxRetries = 3;
  private retryDelay = 1000; // Base retry delay in ms

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: config.apiEndpoint,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth if needed
    this.httpClient.interceptors.request.use(
      (config) => {
        // Add any authentication headers here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 429) {
          // Handle rate limiting
          const retryAfter = error.response.headers['retry-after'];
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : this.retryDelay * 2;
          await this.sleep(delay);
        }
        return Promise.reject(error);
      }
    );
  }

  public async processBatch(events: AnalyticsEvent[]): Promise<BatchResponse> {
    if (events.length === 0) {
      return {
        success: true,
        processed: 0,
        failed: 0,
      };
    }

    try {
      // Split events into chunks if batch is too large
      const chunks = this.chunkEvents(events, this.config.batchSize);
      const results: BatchResponse[] = [];

      for (const chunk of chunks) {
        const result = await this.sendBatch(chunk);
        results.push(result);

        // Add failed events to retry queue
        if (result.errors && result.errors.length > 0) {
          this.addToRetryQueue(chunk, result.errors);
        }
      }

      // Process retry queue
      await this.processRetryQueue();

      // Aggregate results
      return this.aggregateResults(results);
    } catch (error) {
      if (this.config.enableDebugMode) {
        console.error('Batch processing failed:', error);
      }

      // Add all events to retry queue on complete failure
      events.forEach(event => {
        this.retryQueue.set(event.eventId, { event, attempts: 0 });
      });

      return {
        success: false,
        processed: 0,
        failed: events.length,
      };
    }
  }

  private async sendBatch(events: AnalyticsEvent[]): Promise<BatchResponse> {
    try {
      const payload = {
        events,
        metadata: {
          sdkVersion: '1.0.0',
          timestamp: Date.now(),
          count: events.length,
        },
      };

      const response = await this.httpClient.post<BatchResponse>('/events/batch', payload);
      
      if (this.config.enableDebugMode) {
        console.log(`Batch sent successfully: ${events.length} events`);
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }

      throw error;
    }
  }

  private chunkEvents(events: AnalyticsEvent[], chunkSize: number): AnalyticsEvent[][] {
    const chunks: AnalyticsEvent[][] = [];
    
    for (let i = 0; i < events.length; i += chunkSize) {
      chunks.push(events.slice(i, i + chunkSize));
    }

    return chunks;
  }

  private addToRetryQueue(
    events: AnalyticsEvent[],
    errors: Array<{ eventId: string; error: string }>
  ): void {
    const errorMap = new Map(errors.map(e => [e.eventId, e.error]));

    events.forEach(event => {
      if (errorMap.has(event.eventId)) {
        const existing = this.retryQueue.get(event.eventId);
        const attempts = existing ? existing.attempts + 1 : 1;

        if (attempts <= this.maxRetries) {
          this.retryQueue.set(event.eventId, { event, attempts });
        }
      }
    });
  }

  private async processRetryQueue(): Promise<void> {
    if (this.retryQueue.size === 0) {
      return;
    }

    const retryEvents = Array.from(this.retryQueue.values())
      .filter(item => item.attempts <= this.maxRetries)
      .map(item => item.event);

    if (retryEvents.length === 0) {
      this.retryQueue.clear();
      return;
    }

    // Exponential backoff
    const maxAttempts = Math.max(...Array.from(this.retryQueue.values()).map(item => item.attempts));
    const delay = this.retryDelay * Math.pow(2, maxAttempts - 1);
    await this.sleep(delay);

    try {
      const result = await this.sendBatch(retryEvents);

      // Remove successfully processed events from retry queue
      if (result.success || result.processed > 0) {
        const processedIds = new Set(
          retryEvents
            .slice(0, result.processed)
            .map(event => event.eventId)
        );

        processedIds.forEach(id => this.retryQueue.delete(id));
      }

      // Update retry attempts for failed events
      if (result.errors) {
        this.addToRetryQueue(retryEvents, result.errors);
      }
    } catch (error) {
      // Keep events in retry queue
      if (this.config.enableDebugMode) {
        console.error('Retry batch processing failed:', error);
      }
    }
  }

  private aggregateResults(results: BatchResponse[]): BatchResponse {
    const aggregated: BatchResponse = {
      success: true,
      processed: 0,
      failed: 0,
      errors: [],
    };

    results.forEach(result => {
      aggregated.success = aggregated.success && result.success;
      aggregated.processed += result.processed;
      aggregated.failed += result.failed;
      
      if (result.errors) {
        aggregated.errors!.push(...result.errors);
      }
    });

    return aggregated;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async sendBeacon(events: AnalyticsEvent[]): Promise<boolean> {
    if (!navigator.sendBeacon) {
      return false;
    }

    try {
      const payload = JSON.stringify({
        events,
        metadata: {
          sdkVersion: '1.0.0',
          timestamp: Date.now(),
          count: events.length,
        },
      });

      return navigator.sendBeacon(`${this.config.apiEndpoint}/events/beacon`, payload);
    } catch (error) {
      if (this.config.enableDebugMode) {
        console.error('Send beacon failed:', error);
      }
      return false;
    }
  }

  public getRetryQueueSize(): number {
    return this.retryQueue.size;
  }

  public clearRetryQueue(): void {
    this.retryQueue.clear();
  }

  public getRetryQueueStats(): {
    size: number;
    byAttempts: Record<number, number>;
    oldestRetry: number | null;
  } {
    const stats: any = {
      size: this.retryQueue.size,
      byAttempts: {},
      oldestRetry: null,
    };

    if (this.retryQueue.size > 0) {
      const now = Date.now();
      let oldestTimestamp = Infinity;

      this.retryQueue.forEach(({ event, attempts }) => {
        stats.byAttempts[attempts] = (stats.byAttempts[attempts] || 0) + 1;
        
        if (event.timestamp < oldestTimestamp) {
          oldestTimestamp = event.timestamp;
        }
      });

      stats.oldestRetry = now - oldestTimestamp;
    }

    return stats;
  }
}