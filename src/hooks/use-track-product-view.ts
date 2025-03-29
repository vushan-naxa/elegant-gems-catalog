
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

export const useTrackProductView = (productId: string) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!productId) return;

    const trackView = async () => {
      try {
        const { error } = await supabase
          .from('product_views')
          .insert({
            product_id: productId,
            viewer_id: user?.id || null,
            is_guest: !user
          });

        if (error) {
          console.error('Error tracking product view:', error);
        }
      } catch (err) {
        console.error('Failed to track product view:', err);
      }
    };

    trackView();
  }, [productId, user]);
};
