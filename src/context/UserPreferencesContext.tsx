'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Property } from '@/lib/types';

interface UserPreferencesContextType {
  favorites: string[];
  compareList: Property[];
  toggleFavorite: (slug: string) => void;
  addToCompare: (property: Property) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isFavorite: (slug: string) => boolean;
  isComparing: (slug: string) => boolean;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Property[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedCompare = localStorage.getItem('compareList');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
    );
  };

  const addToCompare = (property: Property) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.slug === property.slug)) return prev;
      if (prev.length >= 3) {
        alert('You can only compare up to 3 properties at a time.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromCompare = (slug: string) => {
    setCompareList((prev) => prev.filter((p) => p.slug !== slug));
  };

  const clearCompare = () => setCompareList([]);

  const isFavorite = (slug: string) => favorites.includes(slug);
  const isComparing = (slug: string) => !!compareList.find((p) => p.slug === slug);

  return (
    <UserPreferencesContext.Provider
      value={{
        favorites,
        compareList,
        toggleFavorite,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isFavorite,
        isComparing,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}
