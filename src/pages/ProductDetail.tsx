import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTrackProductView } from '@/hooks/use-track-product-view';
import { useAuth } from '@/providers/AuthProvider';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  // Track product view
  useTrackProductView(id || '');
  
  // Fetch product data
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          stores (
            id,
            name,
            logo_url
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
  
  // Initiate conversation with store
  const startConversation = async () => {
    if (!user || !product?.store_id) {
      // Redirect to login if not logged in
      return;
    }
    
    try {
      // Check if conversation already exists
      const { data: existingConvo } = await supabase
        .from('conversations')
        .select('id')
        .eq('customer_id', user.id)
        .eq('store_id', product.store_id)
        .single();
        
      if (existingConvo) {
        // Redirect to messages with this conversation open
        return;
      }
      
      // Create new conversation
      const { data: newConvo, error } = await supabase
        .from('conversations')
        .insert({
          customer_id: user.id,
          store_id: product.store_id
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Redirect to messages with this conversation open
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };
  
  // Render a loading state or the actual product detail
  // This is just a placeholder - you'd implement the actual UI here
  
  return (
    <div>
      {/* Product detail implementation would go here */}
      {/* This would include the product info, images, and a "Contact Store" button */}
      {/* The startConversation function would be called when clicking that button */}
    </div>
  );
};

export default ProductDetail;
