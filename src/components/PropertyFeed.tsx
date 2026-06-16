import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Property } from '@/lib/types';
import PropertyFeedClient from './PropertyFeedClient';

export default async function PropertyFeed() {
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

  if (properties.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-white/40 text-lg">No properties listed yet. Check back soon.</p>
      </section>
    );
  }

  return <PropertyFeedClient properties={properties} />;
}