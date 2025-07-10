'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  userId?: string;
  userEmail?: string;
}

export function AnalyticsProvider({ children, userId, userEmail }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Analytics Debug:', {
      ENABLE_ANALYTICS,
      MIXPANEL_TOKEN: MIXPANEL_TOKEN ? `${MIXPANEL_TOKEN.slice(0, 8)}...` : 'undefined',
      hasToken: !!MIXPANEL_TOKEN,
      isEnabled: ENABLE_ANALYTICS === true,
    });
    
    if (!ENABLE_ANALYTICS || !MIXPANEL_TOKEN) {
      console.log('Analytics disabled or token missing');
      return;
    }

    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: true,
      persistence: 'localStorage',
      ip: true,
      property_blacklist: ['$current_url', '$initial_referrer', '$referrer'],
    });

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
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      mixpanel.track('Page Exit', {
        page: pathname,
        time_spent_seconds: timeSpent,
        timestamp: new Date().toISOString(),
      });
    };
  }, [pathname, searchParams, userId, userEmail]);

  return <>{children}</>;
}