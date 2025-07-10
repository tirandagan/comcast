import type { AnalyticsEvent } from '@/types/analytics';

export class EventQueue {
  private queue: AnalyticsEvent[] = [];
  private maxSize: number;
  private mutex: Promise<void> = Promise.resolve();

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  public async add(event: AnalyticsEvent): Promise<void> {
    await this.withLock(async () => {
      this.queue.push(event);
      
      // Drop oldest events if queue is full
      if (this.queue.length > this.maxSize) {
        this.queue = this.queue.slice(-this.maxSize);
      }
    });
  }

  public async addBatch(events: AnalyticsEvent[]): Promise<void> {
    await this.withLock(async () => {
      this.queue.push(...events);
      
      // Keep only the most recent events
      if (this.queue.length > this.maxSize) {
        this.queue = this.queue.slice(-this.maxSize);
      }
    });
  }

  public getAll(): AnalyticsEvent[] {
    return [...this.queue];
  }

  public async clear(): Promise<void> {
    await this.withLock(async () => {
      this.queue = [];
    });
  }

  public size(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  public shouldFlush(): boolean {
    return this.queue.length >= this.maxSize * 0.8; // Flush at 80% capacity
  }

  public peek(count?: number): AnalyticsEvent[] {
    if (count === undefined) {
      return [...this.queue];
    }
    return this.queue.slice(0, count);
  }

  public async dequeue(count: number): Promise<AnalyticsEvent[]> {
    return await this.withLock(async () => {
      const events = this.queue.splice(0, count);
      return events;
    });
  }

  // Mutex implementation for thread-safe operations
  private async withLock<T>(fn: () => Promise<T> | T): Promise<T> {
    const unlock = await this.lock();
    try {
      return await fn();
    } finally {
      unlock();
    }
  }

  private async lock(): Promise<() => void> {
    let unlockNext: () => void;
    const willLock = new Promise<void>((resolve) => {
      unlockNext = resolve;
    });
    const willUnlock = this.mutex.then(() => unlockNext);
    this.mutex = willLock;
    await willUnlock;
    return unlockNext!;
  }

  // Get queue statistics
  public getStats(): {
    size: number;
    maxSize: number;
    utilizationPercentage: number;
    oldestEventAge: number | null;
    newestEventAge: number | null;
  } {
    const now = Date.now();
    const oldestEvent = this.queue[0];
    const newestEvent = this.queue[this.queue.length - 1];

    return {
      size: this.queue.length,
      maxSize: this.maxSize,
      utilizationPercentage: (this.queue.length / this.maxSize) * 100,
      oldestEventAge: oldestEvent ? now - oldestEvent.timestamp : null,
      newestEventAge: newestEvent ? now - newestEvent.timestamp : null,
    };
  }

  // Priority queue functionality for critical events
  public async addPriority(event: AnalyticsEvent): Promise<void> {
    await this.withLock(async () => {
      this.queue.unshift(event); // Add to front of queue
      
      if (this.queue.length > this.maxSize) {
        this.queue.pop(); // Remove from end
      }
    });
  }

  // Filter events by type
  public getByType(eventType: string): AnalyticsEvent[] {
    return this.queue.filter(event => event.eventType === eventType);
  }

  // Remove specific events
  public async removeByIds(eventIds: string[]): Promise<void> {
    const idSet = new Set(eventIds);
    await this.withLock(async () => {
      this.queue = this.queue.filter(event => !idSet.has(event.eventId));
    });
  }
}