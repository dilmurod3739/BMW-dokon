'use client';

import { useMemo, useState } from 'react';
import { Car, CarCategory } from '@/types/car';
import { CARS_DATA } from '@/data/cars';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'power-desc';

/**
 * Normalizes text for search comparison:
 * Lowercases and strips diacritics (e.g. 'Coupé' -> 'coupe').
 */
function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function useCarFilter(controlledCategory?: CarCategory) {
  const [internalCategory, setInternalCategory] = useState<CarCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Support both controlled (from parent props) and uncontrolled category state
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const filteredCars = useMemo(() => {
    let result: Car[] = [...CARS_DATA];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((car) => car.category === selectedCategory);
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = normalizeSearchText(searchQuery.trim());
      // Also match without hyphens/spaces (e.g. 'm8' matching 'm-8' or 'm 8')
      const qCompact = q.replace(/[\s-]+/g, '');

      result = result.filter((car) => {
        const nameNorm = normalizeSearchText(car.name);
        const seriesNorm = normalizeSearchText(car.series);
        const taglineNorm = normalizeSearchText(car.tagline);
        const categoryNorm = normalizeSearchText(car.category);
        const engineNorm = normalizeSearchText(car.specs.engine);
        const descNorm = normalizeSearchText(car.description);

        const nameCompact = nameNorm.replace(/[\s-]+/g, '');
        const seriesCompact = seriesNorm.replace(/[\s-]+/g, '');

        return (
          nameNorm.includes(q) ||
          nameCompact.includes(qCompact) ||
          seriesNorm.includes(q) ||
          seriesCompact.includes(qCompact) ||
          taglineNorm.includes(q) ||
          categoryNorm.includes(q) ||
          engineNorm.includes(q) ||
          descNorm.includes(q)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'power-desc': {
          const powerA = parseInt(a.specs.power, 10) || 0;
          const powerB = parseInt(b.specs.power, 10) || 0;
          return powerB - powerA;
        }
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return {
    selectedCategory,
    setSelectedCategory: setInternalCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCars,
    totalCount: CARS_DATA.length,
    matchingCount: filteredCars.length,
  };
}
