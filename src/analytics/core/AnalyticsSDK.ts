import { v4 as uuidv4 } from 'uuid';
import { EventQueue } from './EventQueue';
import { OfflineStorage } from './OfflineStorage';
import { BatchProcessor } from './BatchProcessor';
import type {
  AnalyticsConfig,
  AnalyticsEvent,
  AnalyticsState,
  UserConsent,
  AnalyticsContext,
  TrackingOptions,
  SessionEvent,
} from '@/types/analytics';

export class AnalyticsSDK {
  private static instance: AnalyticsSDK | null = null;
  
  private config: AnalyticsConfig;
  private state: AnalyticsState;
  private context: AnalyticsContext;
  private eventQueue: EventQueue;
  private offlineStorage: OfflineStorage;
  private batchProcessor: BatchProcessor;
  private trackingOptions: TrackingOptions;
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor(config: AnalyticsConfig) {
    this.config = config;
    this.state = {
      isInitialized: false,
      sessionId: this.generateSessionId(),
      consent: this.loadConsent(),
      queueSize: 0,
      lastFlush: Date.now(),
      errors: [],
    };
    
    this.context = this.initializeContext();
    this.eventQueue = new EventQueue(config.batchSize);
    this.offlineStorage = new OfflineStorage();
    this.batchProcessor = new BatchProcessor(config);
    
    this.trackingOptions = {
      enableClickTracking: true,
      enableScrollTracking: true,
      enableReadingTracking: true,
      enableMouseTracking: true,
      enableSelectionTracking: true,
      scrollThrottleMs: 200,
      mouseThrottleMs: 50,
      readingThresholdMs: 3000,
      clickCooldownMs: 500,
    };
  }

  public static getInstance(config?: AnalyticsConfig): AnalyticsSDK {
    if (!AnalyticsSDK.instance) {
      if (!config) {
        throw new Error('Analytics configuration required for initialization');
      }
      AnalyticsSDK.instance = new AnalyticsSDK(config);
    }
    return AnalyticsSDK.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Initialize offline storage
      await this.offlineStorage.initialize();
      
      // Load any pending events from offline storage
      const pendingEvents = await this.offlineStorage.getPendingEvents();
      if (pendingEvents.length > 0) {
        this.eventQueue.addBatch(pendingEvents);
      }
      
      // Setup automatic flushing
      this.setupAutoFlush();
      
      // Setup page lifecycle listeners
      this.setupLifecycleListeners();
      
      // Initialize third-party integrations
      await this.initializeIntegrations();
      
      // Mark as initialized
      this.state.isInitialized = true;
      
      // Send session start event
      this.trackSessionStart();
      
      if (this.config.enableDebugMode) {
        console.log('Analytics SDK initialized', this.state);
      }
    } catch (error) {
      this.logError('Failed to initialize Analytics SDK', error);
      throw error;
    }
  }

  public track(event: Omit<AnalyticsEvent, 'eventId' | 'timestamp' | 'sessionId' | 'userId' | 'pageUrl' | 'pageTitle' | 'userAgent' | 'viewport'>): void {
    if (!this.state.isInitialized) {
      console.warn('Analytics SDK not initialized');
      return;
    }

    if (!this.hasConsent(event.eventType)) {
      return;
    }

    if (Math.random() > this.config.samplingRate) {
      return;
    }

    const enrichedEvent: AnalyticsEvent = {
      ...event,
      eventId: uuidv4(),
      timestamp: Date.now(),
      sessionId: this.state.sessionId,
      userId: this.state.userId,
      pageUrl: window.location.href,
      pageTitle: document.title,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    } as AnalyticsEvent;

    this.eventQueue.add(enrichedEvent);
    this.state.queueSize = this.eventQueue.size();

    if (this.config.enableDebugMode) {
      console.log('Event tracked:', enrichedEvent);
    }

    // Check if we should flush
    if (this.eventQueue.shouldFlush()) {
      this.flush();
    }
  }

  public async flush(): Promise<void> {
    if (this.eventQueue.isEmpty()) {
      return;
    }

    const events = this.eventQueue.getAll();
    this.eventQueue.clear();

    try {
      if (navigator.onLine) {
        await this.batchProcessor.processBatch(events);
        this.state.lastFlush = Date.now();
      } else if (this.config.enableOfflineMode) {
        await this.offlineStorage.saveEvents(events);
      }
    } catch (error) {
      this.logError('Failed to flush events', error);
      
      // Re-queue events on failure
      if (this.config.enableOfflineMode) {
        await this.offlineStorage.saveEvents(events);
      } else {
        this.eventQueue.addBatch(events);
      }
    }
  }

  public setUserId(userId: string): void {
    this.state.userId = userId;
    this.context.user.id = userId;
  }

  public setUserContext(user: Partial<AnalyticsContext['user']>): void {
    this.context.user = { ...this.context.user, ...user };
  }

  public updateConsent(consent: Partial<UserConsent>): void {
    this.state.consent = {
      ...this.state.consent,
      ...consent,
      timestamp: Date.now(),
    };
    this.saveConsent(this.state.consent);
  }

  public getState(): Readonly<AnalyticsState> {
    return { ...this.state };
  }

  public getContext(): Readonly<AnalyticsContext> {
    return { ...this.context };
  }

  public updateTrackingOptions(options: Partial<TrackingOptions>): void {
    this.trackingOptions = { ...this.trackingOptions, ...options };
  }

  public getTrackingOptions(): Readonly<TrackingOptions> {
    return { ...this.trackingOptions };
  }

  public async destroy(): Promise<void> {
    // Send session end event
    this.trackSessionEnd();
    
    // Flush any remaining events
    await this.flush();
    
    // Clear timers
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    // Remove listeners
    this.removeLifecycleListeners();
    
    // Clear instance
    AnalyticsSDK.instance = null;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${uuidv4().substring(0, 8)}`;
  }

  private initializeContext(): AnalyticsContext {
    return {
      user: {},
      session: {
        id: this.state.sessionId,
        startTime: Date.now(),
        referrer: document.referrer,
        campaign: this.getURLParam('utm_campaign'),
        source: this.getURLParam('utm_source'),
        medium: this.getURLParam('utm_medium'),
      },
      device: {
        type: this.getDeviceType(),
        os: this.getOS(),
        browser: this.getBrowser(),
        screenResolution: `${screen.width}x${screen.height}`,
      },
    };
  }

  private setupAutoFlush(): void {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  private setupLifecycleListeners(): void {
    // Page visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Before unload
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    
    // Online/offline status
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  private removeLifecycleListeners(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.flush();
    }
  };

  private handleBeforeUnload = (): void => {
    // Use sendBeacon for reliability
    const events = this.eventQueue.getAll();
    if (events.length > 0) {
      const data = JSON.stringify({ events, context: this.context });
      navigator.sendBeacon(this.config.apiEndpoint + '/events', data);
    }
  };

  private handleOnline = async (): Promise<void> => {
    if (this.config.enableOfflineMode) {
      const pendingEvents = await this.offlineStorage.getPendingEvents();
      if (pendingEvents.length > 0) {
        await this.batchProcessor.processBatch(pendingEvents);
        await this.offlineStorage.clearPendingEvents();
      }
    }
  };

  private handleOffline = (): void => {
    if (this.config.enableDebugMode) {
      console.log('Analytics SDK: Going offline');
    }
  };

  private async initializeIntegrations(): Promise<void> {
    const promises: Promise<void>[] = [];

    if (this.config.integrations.mixpanel?.enabled) {
      promises.push(this.initializeMixpanel());
    }

    if (this.config.integrations.fullstory?.enabled) {
      promises.push(this.initializeFullStory());
    }

    if (this.config.integrations.clarity?.enabled) {
      promises.push(this.initializeClarity());
    }

    await Promise.all(promises);
  }

  private async initializeMixpanel(): Promise<void> {
    // Mixpanel initialization will be handled in the integration module
    if (this.config.enableDebugMode) {
      console.log('Mixpanel integration initialized');
    }
  }

  private async initializeFullStory(): Promise<void> {
    // FullStory initialization will be handled in the integration module
    if (this.config.enableDebugMode) {
      console.log('FullStory integration initialized');
    }
  }

  private async initializeClarity(): Promise<void> {
    // Clarity initialization will be handled in the integration module
    if (this.config.enableDebugMode) {
      console.log('Microsoft Clarity integration initialized');
    }
  }

  private trackSessionStart(): void {
    this.track({
      eventType: 'session',
      sessionData: {
        action: 'start',
        referrer: document.referrer,
      },
    } as Omit<SessionEvent, 'eventId' | 'timestamp' | 'sessionId' | 'userId' | 'pageUrl' | 'pageTitle' | 'userAgent' | 'viewport'>);
  }

  private trackSessionEnd(): void {
    const sessionDuration = Date.now() - this.context.session.startTime;
    this.track({
      eventType: 'session',
      sessionData: {
        action: 'end',
        duration: sessionDuration,
        exitPage: window.location.href,
      },
    } as Omit<SessionEvent, 'eventId' | 'timestamp' | 'sessionId' | 'userId' | 'pageUrl' | 'pageTitle' | 'userAgent' | 'viewport'>);
  }

  private hasConsent(eventType: string): boolean {
    if (this.config.enablePrivacyMode) {
      return false;
    }

    // Map event types to consent categories
    const consentMap: Record<string, keyof UserConsent> = {
      click: 'analytics',
      scroll: 'performance',
      reading: 'analytics',
      mouse_movement: 'performance',
      text_selection: 'preferences',
      session: 'analytics',
      interaction: 'analytics',
    };

    const consentCategory = consentMap[eventType] || 'analytics';
    return this.state.consent[consentCategory] === true;
  }

  private loadConsent(): UserConsent {
    try {
      const stored = localStorage.getItem('analytics_consent');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      this.logError('Failed to load consent', error);
    }

    return {
      analytics: false,
      performance: false,
      marketing: false,
      preferences: false,
      timestamp: Date.now(),
    };
  }

  private saveConsent(consent: UserConsent): void {
    try {
      localStorage.setItem('analytics_consent', JSON.stringify(consent));
    } catch (error) {
      this.logError('Failed to save consent', error);
    }
  }

  private getURLParam(param: string): string | undefined {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || undefined;
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getOS(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private logError(message: string, error: any): void {
    const errorEntry = {
      timestamp: Date.now(),
      error: message,
      context: error,
    };

    this.state.errors.push(errorEntry);
    
    // Keep only last 100 errors
    if (this.state.errors.length > 100) {
      this.state.errors = this.state.errors.slice(-100);
    }

    if (this.config.enableDebugMode) {
      console.error(`Analytics SDK Error: ${message}`, error);
    }
  }
}