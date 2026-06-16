import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Property } from '@/lib/types';
import PropertyDetailClient from './PropertyDetailClient';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let property: Property | null = null;
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('properties').select('*').eq('slug', slug).single();
    property = data as Property;
  } catch (e) {
    console.error('Failed to fetch property:', e);
  }

  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}