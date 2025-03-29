
import React from 'react';
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.images?.[0] || '/placeholder.svg'} 
              alt={product.name} 
              className="w-full h-64 md:h-auto object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Store: {product.stores?.name || 'Unknown Store'}
            </p>
            <div className="flex items-center mt-3">
              <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-semibold">
                {product.metal_type} • {product.purity}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{product.description || 'No description available.'}</p>
            <div className="mt-6">
              <p className="text-3xl font-bold text-rose-600">₹{product.price.toLocaleString()}</p>
            </div>
            <button
              onClick={startConversation}
              className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Contact Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
