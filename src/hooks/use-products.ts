
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
  } | null;
};

export function useProducts(options?: { 
  storeId?: string;
  categoryId?: string;
  featured?: boolean;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          stores (
            id,
            name,
            logo_url,
            description
          )
        `);
      
      // Apply filters
      if (options?.storeId) {
        query = query.eq('store_id', options.storeId);
      }
      
      if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
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
      
      return data as Product[];
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
