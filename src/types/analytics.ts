// Analytics Event Types
export interface BaseEvent {
  eventId: string;
  eventType: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  pageUrl: string;
  pageTitle: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  metadata?: Record<string, any>;
}

export interface ClickEvent extends BaseEvent {
  eventType: 'click';
  elementData: {
    tagName: string;
    className?: string;
    id?: string;
    text?: string;
    href?: string;
    path: string;
  };
  coordinates: {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
  };
}

export interface ScrollEvent extends BaseEvent {
  eventType: 'scroll';
  scrollData: {
    scrollY: number;
    scrollX: number;
    documentHeight: number;
    viewportHeight: number;
    scrollDepth: number;
    maxScrollDepth: number;
  };
  sectionVisibility: Record<string, number>;
}

export interface ReadingEvent extends BaseEvent {
  eventType: 'reading';
  readingData: {
    elementId: string;
    elementType: string;
    startTime: number;
    endTime: number;
    duration: number;
    wordCount: number;
    readingVelocity: number;
    percentageRead: number;
    isReRead: boolean;
    visitCount: number;
  };
}

export interface MouseMovementEvent extends BaseEvent {
  eventType: 'mouse_movement';
  movementData: {
    path: Array<{ x: number; y: number; time: number }>;
    hoverZones: Array<{
      elementId: string;
      duration: number;
      entryTime: number;
      exitTime: number;
    }>;
    hesitationPoints: Array<{
      x: number;
      y: number;
      duration: number;
    }>;
  };
}

export interface TextSelectionEvent extends BaseEvent {
  eventType: 'text_selection';
  selectionData: {
    selectedText: string;
    startNode: string;
    endNode: string;
    wordCount: number;
    context: string;
    action: 'select' | 'copy';
  };
}

export interface SessionEvent extends BaseEvent {
  eventType: 'session';
  sessionData: {
    action: 'start' | 'end' | 'heartbeat';
    duration?: number;
    pageViews?: number;
    interactions?: number;
    referrer?: string;
    exitPage?: string;
  };
}

export interface InteractionEvent extends BaseEvent {
  eventType: 'interaction';
  interactionData: {
    elementType: 'video' | 'chart' | 'image' | 'quiz' | 'download' | 'share';
    elementId: string;
    action: string;
    value?: any;
    duration?: number;
  };
}

export type AnalyticsEvent =
  | ClickEvent
  | ScrollEvent
  | ReadingEvent
  | MouseMovementEvent
  | TextSelectionEvent
  | SessionEvent
  | InteractionEvent;

// Analytics Configuration
export interface AnalyticsConfig {
  apiEndpoint: string;
  batchSize: number;
  flushInterval: number;
  enableOfflineMode: boolean;
  enableDebugMode: boolean;
  enablePrivacyMode: boolean;
  samplingRate: number;
  integrations: {
    mixpanel?: {
      token: string;
      enabled: boolean;
    };
    fullstory?: {
      orgId: string;
      enabled: boolean;
    };
    clarity?: {
      projectId: string;
      enabled: boolean;
    };
  };
}

// User Consent
export interface UserConsent {
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  ipAddress?: string;
}

// Analytics State
export interface AnalyticsState {
  isInitialized: boolean;
  sessionId: string;
  userId?: string;
  consent: UserConsent;
  queueSize: number;
  lastFlush: number;
  errors: Array<{
    timestamp: number;
    error: string;
    context?: any;
  }>;
}

// Tracking Options
export interface TrackingOptions {
  enableClickTracking: boolean;
  enableScrollTracking: boolean;
  enableReadingTracking: boolean;
  enableMouseTracking: boolean;
  enableSelectionTracking: boolean;
  scrollThrottleMs: number;
  mouseThrottleMs: number;
  readingThresholdMs: number;
  clickCooldownMs: number;
}

// Analytics Context
export interface AnalyticsContext {
  user: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    company?: string;
    registeredAt?: number;
  };
  session: {
    id: string;
    startTime: number;
    referrer?: string;
    campaign?: string;
    source?: string;
    medium?: string;
  };
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
    screenResolution: string;
  };
}

// Reading Analytics
export interface ReadingMetrics {
  totalReadingTime: number;
  averageReadingSpeed: number;
  completionRate: number;
  reReadSections: string[];
  attentionScore: number;
  engagementLevel: 'low' | 'medium' | 'high';
}

// Heatmap Data
export interface HeatmapData {
  pageUrl: string;
  clickPoints: Array<{
    x: number;
    y: number;
    count: number;
  }>;
  scrollDepths: Array<{
    depth: number;
    users: number;
  }>;
  attentionZones: Array<{
    elementId: string;
    totalTime: number;
    interactions: number;
  }>;
}