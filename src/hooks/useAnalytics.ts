'use client';

import { useCallback } from 'react';
import mixpanel from 'mixpanel-browser';

const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

export function useAnalytics() {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!ENABLE_ANALYTICS) return;
    
    try {
      mixpanel.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, []);

  const trackClick = useCallback((elementName: string, properties?: Record<string, any>) => {
    track('Click', {
      element: elementName,
      ...properties,
    });
  }, [track]);

  const trackScroll = useCallback((depth: number, properties?: Record<string, any>) => {
    track('Scroll', {
      depth_percent: depth,
      ...properties,
    });
  }, [track]);

  const trackSearch = useCallback((query: string, resultsCount?: number) => {
    track('Search', {
      query,
      results_count: resultsCount,
    });
  }, [track]);

  const trackChapterView = useCallback((chapterSlug: string, chapterTitle: string) => {
    track('Chapter View', {
      chapter_slug: chapterSlug,
      chapter_title: chapterTitle,
      page_type: 'report_chapter',
    });
  }, [track]);

  const trackTimeSpent = useCallback((eventName: string, seconds: number, properties?: Record<string, any>) => {
    track(eventName, {
      duration_seconds: seconds,
      ...properties,
    });
  }, [track]);

  const setUserProperty = useCallback((properties: Record<string, any>) => {
    if (!ENABLE_ANALYTICS) return;
    
    try {
      mixpanel.people.set(properties);
    } catch (error) {
      console.error('Analytics user property error:', error);
    }
  }, []);

  return {
    track,
    trackClick,
    trackScroll,
    trackSearch,
    trackChapterView,
    trackTimeSpent,
    setUserProperty,
  };
}