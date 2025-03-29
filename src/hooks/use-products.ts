
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getSavedUserLocation, calculateDistance } from '@/lib/location-utils';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[] | null;
  metal_type: string;
  purity: string;
  store_id: string;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  stores?: {
    id: string;
    name: string;
    logo_url: string | null;
    description: string | null;
    latitude: number | null;
    longitude: number | null;
  } | null;
  distance?: number;
};

export function useProducts(options?: { 
  storeId?: string;
  categoryId?: string;
  featured?: boolean;
  limit?: number;
  searchQuery?: string;
  maxDistance?: number;
  minPrice?: number;
  maxPrice?: number;
  purity?: string[];
}) {
  const userLocation = getSavedUserLocation();
  
  return useQuery({
    queryKey: ['products', options, userLocation],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          stores (
            id,
            name,
            logo_url,
            description,
            latitude,
            longitude
          )
        `);
      
      // Apply filters
      if (options?.storeId) {
        query = query.eq('store_id', options.storeId);
      }
      
      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
      }
      
      if (options?.searchQuery) {
        query = query.or(`name.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`);
      }
      
      if (options?.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      
      if (options?.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }
      
      if (options?.purity && options.purity.length > 0) {
        query = query.in('purity', options.purity);
      }
      
      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      // Order by creation date (newest first)
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      let products = data as Product[];
      
      // Calculate distance if userLocation is available and maxDistance is set
      if (userLocation && options?.maxDistance) {
        products = products
          .map(product => {
            const storeLatitude = product.stores?.latitude;
            const storeLongitude = product.stores?.longitude;
            
            if (storeLatitude && storeLongitude) {
              const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                storeLatitude,
                storeLongitude
              );
              return { ...product, distance };
            }
            
            return { ...product, distance: Infinity };
          })
          .filter(product => product.distance <= options.maxDistance)
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      }
      
      return products;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
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
            logo_url,
            description
          )
        `)
        .eq('id', id)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as Product;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
