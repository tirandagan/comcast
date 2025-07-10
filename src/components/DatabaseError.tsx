'use client';

import { AlertTriangle } from 'lucide-react';

export function DatabaseError() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-red-500/20 rounded-lg p-8 max-w-md w-full text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Database Connection Error</h1>
        <p className="text-gray-400 mb-6">
          We're experiencing temporary database connectivity issues. This is likely due to the Supabase connection pooler being temporarily unavailable.
        </p>
        <div className="space-y-4 text-left">
          <div className="bg-gray-700/50 rounded p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">What's happening:</h3>
            <p className="text-sm text-gray-400">
              The Supabase pooled connection service appears to be down. This is a temporary issue that typically resolves within a few minutes.
            </p>
          </div>
          <div className="bg-gray-700/50 rounded p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">What you can do:</h3>
            <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
              <li>Wait a few minutes and refresh the page</li>
              <li>Check Supabase status at status.supabase.com</li>
              <li>Contact support if the issue persists</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}