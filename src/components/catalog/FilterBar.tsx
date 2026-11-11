'use client';

import * as React from 'react';
import { CarCategory } from '@/types/car';
import { CATEGORIES_CONFIG } from '@/data/cars';
import { SortOption } from '@/hooks/useCarFilter';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  selectedCategory: CarCategory;
  onSelectCategory: (category: CarCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  matchingCount: number;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  matchingCount,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Model yoki seriyani qidirish"
            placeholder="Model yoki seriyani qidirish (masalan: M8, i7, X5, Coupé)..."
            className="w-full bg-[#121316] border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4] focus:ring-1 focus:ring-[#1C69D4] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Qidiruv matnini tozalash"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort selector & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-neutral-400 hidden lg:inline">
            Topildi: <strong className="text-white">{matchingCount}</strong> ta model
          </span>

          <div className="flex items-center gap-2 bg-[#121316] border border-white/10 rounded-full px-3.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">Tartib:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Modellarni saralash tartibi"
              className="bg-transparent text-xs text-white outline-none cursor-pointer pr-1"
            >
              <option value="featured" className="bg-[#121316] text-white">
                Eng saralari
              </option>
              <option value="price-asc" className="bg-[#121316] text-white">
                Narx: Avval arzonroq
              </option>
              <option value="price-desc" className="bg-[#121316] text-white">
                Narx: Avval qimmatroq
              </option>
              <option value="power-desc" className="bg-[#121316] text-white">
                Eng kuchli dvigatel
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id as CarCategory)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer',
                isActive
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-[#121316] text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-semibold',
                  isActive
                    ? 'bg-black/10 text-black'
                    : 'bg-white/5 text-neutral-400'
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
