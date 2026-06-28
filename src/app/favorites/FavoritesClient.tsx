'use client';

import { useEffect, useState } from 'react';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import PropertyVideoCard from '@/components/PropertyVideoCard';
import type { Property } from '@/lib/types';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';

export default function FavoritesClient() {
  const { favorites } = useUserPreferences();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setFavoriteProperties([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .from('properties')
          .select('*')
          .in('slug', favorites);

        if (error) throw error;
        setFavoriteProperties((data || []) as Property[]);
      } catch (err) {
        console.error('Failed to fetch favorites', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (favorites.length === 0 || favoriteProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-white/5 p-6 mb-4">
          <HeartCrack size={48} className="text-white/20" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
        <p className="text-white/40 max-w-md mb-8">
          You haven't added any properties to your favorites. Explore our listings and click the heart icon to save them here.
        </p>
        <Link 
          href="/properties"
          className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25"
        >
          Explore Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteProperties.map((property) => (
        <PropertyVideoCard key={property.id} property={property} />
      ))}
    </div>
  );
}
