import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalskondapur.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let properties: any[] = [];
  
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('properties').select('slug, updated_at');
    properties = data || [];
  } catch (err) {
    console.warn('Could not fetch properties for sitemap during build:', err);
  }

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: new Date(property.updated_at || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...propertyEntries,
  ];
}
