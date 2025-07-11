'use client';

import { useEffect, useState } from 'react';
import mixpanel from 'mixpanel-browser';

const ENABLE_ANALYTICS = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

export function UserAwareAnalytics() {
  const [isIdentified, setIsIdentified] = useState(false);

  useEffect(() => {
    if (!ENABLE_ANALYTICS || isIdentified) return;

    // Fetch user data from API
    const identifyUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          
          if (user && user.id) {
            // Identify user in Mixpanel with full details
            mixpanel.identify(user.id);
            
            // Set user profile properties
            mixpanel.people.set({
              $email: user.email,
              $name: user.name,
              $created: user.createdAt,
              role: user.role,
              registration_status: user.registrationStatus,
              title: user.title,
              last_login: user.lastLoginAt,
            });
            
            // Also set these as super properties for all events
            mixpanel.register({
              user_id: user.id,
              user_email: user.email,
              user_name: user.name,
              user_role: user.role,
              site_name: 'Comcast',
            });
            
            setIsIdentified(true);
            console.log('Analytics: User identified', { id: user.id, email: user.email });
          }
        }
      } catch (error) {
        console.error('Failed to identify user for analytics:', error);
      }
    };

    identifyUser();
  }, [isIdentified]);

  return null;
}