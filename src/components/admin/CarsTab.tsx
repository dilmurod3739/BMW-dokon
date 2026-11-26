'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { CARS_DATA } from '@/data/cars';
import { Car, CarCategory } from '@/types/car';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Gauge,
  Zap,
  ShieldCheck,
  Palette,
  ExternalLink,
  Check,
  Eye,
} from 'lucide-react';

interface CarsTabProps {
  searchQuery: string;
}

export function CarsTab({ searchQuery }: CarsTabProps) {
  const [categoryFilter, setCategoryFilter] = useState<CarCategory>('all');
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>({
    'bmw-m8-gran-coupe': true,
    'bmw-i7-xdrive60': true,
    'bmw-m4-competition': true,
    'bmw-x7-m60i': true,
    'bmw-x5-m-competition': true,
    'bmw-5-series-sedan': true,
    'bmw-7-series-sedan': true,
    'bmw-x1-xdrive28i': true,
    'bmw-i4-m50': true,
  });

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      if (categoryFilter !== 'all' && car.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesSeries = car.series.toLowerCase().includes(query);
        const matchesCategory = car.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSeries && !matchesCategory) return false;
      }
      return true;
    });
  }, [categoryFilter, searchQuery]);

  const toggleStock = (carId: string) => {
    setStockStatus((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-[#121317] border border-white/10 rounded-2xl p-4">
        {[
          { id: 'all' as CarCategory, label: 'Barchasi', count: CARS_DATA.length },
          {
            id: 'm-power' as CarCategory,
            label: 'BMW M Power',
            count: CARS_DATA.filter((c) => c.category === 'm-power').length,
          },
          {
            id: 'bmw-i' as CarCategory,
            label: 'BMW i (Elektr)',
            count: CARS_DATA.filter((c) => c.category === 'bmw-i').length,
          },
          {
            id: 'x-series' as CarCategory,
            label: 'X Seriyasi (SUV)',
            count: CARS_DATA.filter((c) => c.category === 'x-series').length,
          },
          {
            id: 'sedans' as CarCategory,
            label: 'Hashamatli Sedanlar',
            count: CARS_DATA.filter((c) => c.category === 'sedans').length,
          },
        ].map((tab) => {
          const isSelected = categoryFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => {
          const inStock = stockStatus[car.id] ?? true;

          return (
            <div
              key={car.id}
              className="bg-[#121317] border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Car Preview Image */}
                <div className="relative h-48 w-full bg-gradient-to-b from-[#18191f] to-[#0A0A0C] p-4 flex items-center justify-center">
                  <Image
                    src={car.heroImage}
                    alt={car.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Stock Pill Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => toggleStock(car.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                        inStock
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                      title="Holatni o‘zgartirish uchun bosing"
                    >
                      {inStock ? '● Sotuvda Mavjud' : '○ Buyurtma Asosida'}
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {car.series}
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {car.tagline}
                    </p>
                  </div>

                  {/* Key Specs Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">0-100 km/h</span>
                      <span className="text-xs font-bold text-white">{car.specs.acceleration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Quvvat</span>
                      <span className="text-xs font-bold text-[#38bdf8]">{car.specs.power}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Maks. Tezlik</span>
                      <span className="text-xs font-bold text-white">{car.specs.topSpeed}</span>
                    </div>
                  </div>

                  {/* Colors & Interior Count */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{car.colors.length} xil bo‘yoq</span>
                    </div>
                    <span>{car.interiorColors?.length || 4} xil charm salon</span>
                  </div>
                </div>
              </div>

              {/* Price and Action Bar */}
              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Rasmiy Narx</span>
                  <span className="text-base font-black text-white">
                    {formatPrice(car.price)}
                  </span>
                </div>

                <a
                  href={`/#catalog`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Saytda ko‘rish</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
