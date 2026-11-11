'use client';

import * as React from 'react';
import { Car, CarCategory, CarColor } from '@/types/car';
import { useCarFilter } from '@/hooks/useCarFilter';
import { FilterBar } from './FilterBar';
import { CarCard } from './CarCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchX, RotateCcw } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface CatalogSectionProps {
  selectedCategory: CarCategory;
  onSelectCategory: (category: CarCategory) => void;
  onViewDetails: (car: Car, initialColorIndex?: number) => void;
  onBookTestDrive: (car: Car, selectedColor?: CarColor) => void;
  favoriteIds?: string[];
  onToggleFavorite?: (carId: string) => void;
  onCompare?: (carId: string) => void;
}

export function CatalogSection({
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  onBookTestDrive,
  favoriteIds = [],
  onToggleFavorite,
  onCompare,
}: CatalogSectionProps) {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCars,
    matchingCount,
  } = useCarFilter(selectedCategory);

  return (
    <section id="catalog" className="py-24 sm:py-32 bg-[#0E0F12] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066B1]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="outline" className="mb-3">
            BMW Flagmanlar Kolleksiyasi
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Sizning Idealingizdagi <br />
            <span className="text-neutral-400">BMW Modelini Tanlang</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Koupe, sedan, krosshover yoki to‘liq elektr: har bir BMW o‘z sinfida yangi standartlarni o‘rnatadi.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-12">
          <FilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            matchingCount={matchingCount}
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
                  onViewDetails={onViewDetails}
                  onBookTestDrive={onBookTestDrive}
                  isFavorite={favoriteIds.includes(car.id)}
                  onToggleFavorite={onToggleFavorite}
                  onCompare={onCompare}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Hech qanday model topilmadi
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              "{searchQuery}" so‘rovi bo‘yicha avtomobillar topilmadi. Qidiruv so‘zini o‘zgartiring yoki filtrlarni tozalang.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Filtrlarni tozalash
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
