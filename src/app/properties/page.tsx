import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Property } from '@/lib/types';
import PropertiesPageClient from './PropertiesPageClient';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  let properties: Property[] = [];

  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    properties = (data || []) as Property[];
  } catch (e) {
    console.error('Failed to fetch properties:', e);
  }

  return <PropertiesPageClient properties={properties} />;
}