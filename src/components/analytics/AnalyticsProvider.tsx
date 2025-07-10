'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
const IGNORE_DNT = process.env.NEXT_PUBLIC_IGNORE_DNT === 'true';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  userId?: string;
  userEmail?: string;
}

export function AnalyticsProvider({ children, userId, userEmail }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if Do Not Track is enabled
    const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
    const isDNTEnabled = dnt === '1' || dnt === 'yes' || dnt === true;
    const shouldRespectDNT = isDNTEnabled && !IGNORE_DNT;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Debug:', {
        ENABLE_ANALYTICS,
        MIXPANEL_TOKEN: MIXPANEL_TOKEN ? `${MIXPANEL_TOKEN.slice(0, 8)}...` : 'undefined',
        hasToken: !!MIXPANEL_TOKEN,
        isEnabled: ENABLE_ANALYTICS === true,
        doNotTrack: isDNTEnabled,
        ignoreDNT: IGNORE_DNT,
        willTrack: ENABLE_ANALYTICS && !shouldRespectDNT
      });
    }
    
    if (!ENABLE_ANALYTICS || !MIXPANEL_TOKEN) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics disabled or token missing');
      }
      return;
    }

    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: false, // Disable debug to reduce console noise
      track_pageview: true,
      persistence: 'localStorage',
      ip: true,
      property_blacklist: ['$current_url', '$initial_referrer', '$referrer'],
      // Set ignore_dnt to true to suppress warnings, but we'll still respect DNT
      ignore_dnt: true,
    });

    // If DNT is enabled and we're not ignoring it, disable tracking
    if (shouldRespectDNT) {
      mixpanel.opt_out_tracking();
      console.log('Analytics: Respecting Do Not Track preference - tracking disabled');
      return;
    }

    // Set user identity if available
    if (userId) {
      mixpanel.identify(userId);
      mixpanel.people.set({
        $email: userEmail,
        $last_login: new Date().toISOString(),
      });
    }

    // Track initial page view
    mixpanel.track('Page View', {
      page: pathname,
      title: document.title,
      referrer: document.referrer,
      search: searchParams.toString(),
    });
  }, [pathname, searchParams, userId, userEmail]);

  useEffect(() => {
    if (!ENABLE_ANALYTICS || !MIXPANEL_TOKEN) return;

    // Check DNT again for route changes
    const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
    const isDNTEnabled = dnt === '1' || dnt === 'yes' || dnt === true;
    const shouldRespectDNT = isDNTEnabled && !IGNORE_DNT;
    
    if (shouldRespectDNT) return; // Skip tracking if DNT is enabled and not ignored

    // Track page views on route changes
    mixpanel.track('Page View', {
      page: pathname,
      title: document.title,
      referrer: document.referrer,
      search: searchParams.toString(),
      timestamp: new Date().toISOString(),
    });

    // Track time spent on previous page
    const startTime = Date.now();
    
    return () => {
      if (!shouldRespectDNT) { // Only track exit if DNT is not enabled or is ignored
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        mixpanel.track('Page Exit', {
          page: pathname,
          time_spent_seconds: timeSpent,
          timestamp: new Date().toISOString(),
        });
      }
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}