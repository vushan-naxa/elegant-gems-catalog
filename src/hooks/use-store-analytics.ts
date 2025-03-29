
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type AnalyticsData = {
  totalViews: number;
  totalMessages: number;
  tierOne: number; // Registered + viewed + messaged
  tierTwo: number; // Registered + viewed only
  tierThree: number; // Guest + viewed
};

export const useStoreAnalytics = (storeId: string | null) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalMessages: 0,
    tierOne: 0,
    tierTwo: 0,
    tierThree: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!storeId) return;
    
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      try {
        // Get all products from the store
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('id')
          .eq('store_id', storeId);
          
        if (productsError) throw productsError;
        
        if (!products || products.length === 0) {
          setIsLoading(false);
          return;
        }
        
        const productIds = products.map(p => p.id);
        
        // Get total views
        const { data: viewsData, error: viewsError } = await supabase
          .from('product_views')
          .select('viewer_id, is_guest, product_id')
          .in('product_id', productIds);
          
        if (viewsError) throw viewsError;
        
        // Get conversations for store
        const { data: conversations, error: convoError } = await supabase
          .from('conversations')
          .select('id, customer_id')  // Added 'id' to the select query
          .eq('store_id', storeId);
          
        if (convoError) throw convoError;
        
        // Get message count
        const { count: messageCount, error: msgError } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .in(
            'conversation_id',
            conversations.map(c => c.id)
          );
          
        if (msgError) throw msgError;
        
        // Process analytics data
        const viewerSet = new Set<string>();
        const guestCount = viewsData?.filter(v => v.is_guest).length || 0;
        const registeredViewers = new Set<string>();
        
        // Count unique viewers
        viewsData?.forEach(view => {
          if (view.viewer_id && !view.is_guest) {
            registeredViewers.add(view.viewer_id);
          }
          
          if (view.viewer_id) {
            viewerSet.add(view.viewer_id);
          }
        });
        
        // Set of customers who have messaged
        const messagingCustomers = new Set(conversations.map(c => c.customer_id));
        
        // Calculate tiers
        const tierOne = Array.from(registeredViewers).filter(id => 
          messagingCustomers.has(id)
        ).length;
        
        const tierTwo = registeredViewers.size - tierOne;
        
        setAnalytics({
          totalViews: viewsData?.length || 0,
          totalMessages: messageCount || 0,
          tierOne,
          tierTwo,
          tierThree: guestCount
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [storeId]);

  return {
    analytics,
    isLoading
  };
};
