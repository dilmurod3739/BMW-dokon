'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bmw_garage_favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed);
        }
      }
    } catch {
      // Ignore parse/storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((carId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or unavailable
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (carId: string) => favoriteIds.includes(carId),
    [favoriteIds]
  );

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
  }, []);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    isLoaded,
    count: favoriteIds.length,
  };
}
