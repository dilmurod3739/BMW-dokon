'use client';

import * as React from 'react';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CarCategory, Car } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { SortOption } from '@/hooks/useCarFilter';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { FilterBar } from '@/components/catalog/FilterBar';
import { CarCard } from '@/components/catalog/CarCard';
import { Badge } from '@/components/ui/Badge';
import { AnimatePresence } from 'framer-motion';

function ModelsContent() {
  const { openTestDrive, openCarDetail, openCompare, favoriteIds, toggleFavorite } = useSiteModal();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams?.get('category') as CarCategory) || 'all';
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Category filter
      if (selectedCategory !== 'all' && car.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesSeries = car.series.toLowerCase().includes(query);
        const matchesTagline = car.tagline.toLowerCase().includes(query);
        const matchesEngine = car.specs.engine.toLowerCase().includes(query);
        if (!matchesName && !matchesSeries && !matchesTagline && !matchesEngine) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'power-desc') {
        const powerA = parseInt(a.specs.power.replace(/\D/g, '')) || 0;
        const powerB = parseInt(b.specs.power.replace(/\D/g, '')) || 0;
        return powerB - powerA;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <Badge variant="outline" className="mb-3">
          BMW Rasmiy Modellar Kolleksiyasi
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Sizning Idealingizdagi <br />
          <span className="text-neutral-400">BMW Modelini Tanlang</span>
        </h1>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10">
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          matchingCount={filteredCars.length}
        />
      </div>

      {/* Cars Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={(c) => openCarDetail(c)}
                onBookTestDrive={(c, color) => openTestDrive(c.id, color)}
                isFavorite={favoriteIds.includes(car.id)}
                onToggleFavorite={toggleFavorite}
                onCompare={(carId) => openCompare([carId])}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl bg-white/5 border border-white/10">
          <p className="text-lg text-neutral-400 font-medium">
            Mos keluvchi BMW modellari topilmadi.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
          >
            Barcha modellarni ko‘rish
          </button>
        </div>
      )}
    </div>
  );
}

export default function ModelsPage() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="pt-32 text-center text-neutral-400">Yuklanmoqda...</div>}>
        <ModelsContent />
      </Suspense>
    </SiteLayout>
  );
}
