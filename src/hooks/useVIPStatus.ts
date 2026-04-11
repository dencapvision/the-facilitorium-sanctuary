'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Custom hook to check if the current authenticated user has an active VIP subscription.
 * Queries the 'subscriptions' table for an 'active' status and non-expired membership.
 */
export function useVIPStatus() {
  const [isVIP, setIsVIP] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsVIP(false);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('subscriptions')
          .select('status, expiry_date')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .gt('expiry_date', new Date().toISOString())
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription status:', error);
          setIsVIP(false);
        } else {
          setIsVIP(!!data);
        }
      } catch (err) {
        console.error('Unexpected error in useVIPStatus:', err);
        setIsVIP(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
    
    // Optional: Real-time listener for subscription updates
    const subscriptionChannel = supabase
      .channel('subscription_updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'subscriptions' },
        () => checkStatus()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscriptionChannel);
    };
  }, []);

  return { isVIP, loading };
}
