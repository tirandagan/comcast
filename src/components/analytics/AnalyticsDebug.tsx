'use client';

import { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';
import { useAnalytics } from '@/hooks/useAnalytics';

export function AnalyticsDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const analytics = useAnalytics();

  useEffect(() => {
    const info = {
      mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
      analyticsEnabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
      mixpanelInitialized: typeof mixpanel !== 'undefined' && mixpanel.get_distinct_id,
      distinctId: typeof mixpanel !== 'undefined' && mixpanel.get_distinct_id ? mixpanel.get_distinct_id() : 'Not available',
      currentUrl: window.location.href,
      nodeEnv: process.env.NODE_ENV,
    };

    setDebugInfo(info);

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Debug Info:', info);
    }
    
    // Try to track a test event (only if DNT is not enabled)
    const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
    const isDNTEnabled = dnt === '1' || dnt === 'yes' || dnt === true;
    
    if (info.mixpanelInitialized && !isDNTEnabled) {
      try {
        mixpanel.track('Analytics Debug Test', {
          debug: true,
          timestamp: new Date().toISOString(),
        });
        console.log('Test event sent to Mixpanel');
      } catch (error) {
        console.error('Error sending test event:', error);
      }
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold text-white mb-2">Analytics Debug</h3>
      <div className="space-y-1 text-gray-300">
        <div>Token: {debugInfo.mixpanelToken ? `${debugInfo.mixpanelToken.slice(0, 8)}...` : 'Not set'}</div>
        <div>Enabled: {debugInfo.analyticsEnabled}</div>
        <div>Initialized: {String(debugInfo.mixpanelInitialized)}</div>
        <div>Distinct ID: {debugInfo.distinctId}</div>
        <div>Environment: {debugInfo.nodeEnv}</div>
      </div>
      <button
        onClick={() => {
          analytics.track('Manual Debug Test', { 
            source: 'debug_component',
            timestamp: new Date().toISOString()
          });
          alert('Test event sent!');
        }}
        className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Send Test Event
      </button>
    </div>
  );
}