'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { reportChapters } from '@/lib/report-data';
import { useAnalytics } from '@/hooks/useAnalytics';

function ReportPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();
  
  useEffect(() => {
    // Check for user identification parameters
    const uid = searchParams.get('uid');
    const email = searchParams.get('email');
    
    if (uid && email) {
      // Set user properties for analytics
      analytics.setUserProperty({
        $email: email,
        user_id: uid,
        last_login: new Date().toISOString()
      });
    }
    
    // Clean up auth callback parameter if present
    if (searchParams.get('auth') === 'callback') {
      // Small delay to ensure cookies are set
      setTimeout(() => {
        router.replace('/report');
      }, 100);
      return;
    }
    
    // Redirect to first chapter
    if (reportChapters.length > 0) {
      router.push(`/report/${reportChapters[0].slug}`);
    }
  }, [router, searchParams, analytics]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading report...</p>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ReportPageContent />
    </Suspense>
  );
}