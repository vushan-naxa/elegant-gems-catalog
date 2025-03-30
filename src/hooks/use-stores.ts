
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Store = {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  owner_id: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  address: string | null;
  contact_info: string | null;
};

export function useStores(options?: { limit?: number }) {
  return useQuery({
    queryKey: ['stores', options],
    queryFn: async () => {
      let query = supabase.from('stores').select('*');
      
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
      
      return data as Store[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useStore(id: string | undefined) {
  return useQuery({
    queryKey: ['store', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as Store;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useStoreByOwner(ownerId: string | undefined) {
  return useQuery({
    queryKey: ['store_by_owner', ownerId],
    queryFn: async () => {
      if (!ownerId) return null;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', ownerId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as Store;
    },
    enabled: !!ownerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
