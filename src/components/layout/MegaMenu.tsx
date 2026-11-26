'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarCategory } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { ChevronRight, Zap, ArrowRight, X } from 'lucide-react';

export type MegaMenuCategory =
  | 'all'
  | 'suv'
  | 'sedan'
  | 'coupe'
  | 'convertible'
  | 'touring'
  | 'electric'
  | 'm-power'
  | 'alpina';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (carId: string) => void;
  onSelectCategory: (category: CarCategory) => void;
}

interface MenuItemCategory {
  id: MegaMenuCategory;
  label: string;
  badge?: React.ReactNode;
}

const MENU_CATEGORIES: MenuItemCategory[] = [
  { id: 'all', label: 'Barcha modellar' },
  { id: 'suv', label: 'SUVlar' },
  { id: 'sedan', label: 'Sedanlar' },
  { id: 'coupe', label: 'Kupelar' },
  { id: 'convertible', label: 'Kabrioletlar' },
  { id: 'touring', label: 'Sayohat (Touring)' },
  {
    id: 'electric',
    label: 'Elektrlashtirilgan',
    badge: <Zap className="w-3.5 h-3.5 text-[#0066B1] fill-[#0066B1] inline ml-1" />,
  },
  {
    id: 'm-power',
    label: 'BMW M',
    badge: (
      <span className="inline-flex items-center ml-1 text-[10px] font-black tracking-tight italic">
        <span className="text-[#0066B1]">/</span>
        <span className="text-[#1C69D4]">/</span>
        <span className="text-[#E2231A]">/</span>
        <span className="text-white ml-0.5">M</span>
      </span>
    ),
  },
  { id: 'alpina', label: 'BMW ALPINA' },
];

export function MegaMenu({
  isOpen,
  onClose,
  onSelectCar,
  onSelectCategory,
}: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MegaMenuCategory>('all');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter cars based on selected mega-menu category
  const filteredCars = React.useMemo(() => {
    switch (activeCategory) {
      case 'all':
        return CARS_DATA;
      case 'suv':
        return CARS_DATA.filter((c) => c.category === 'x-series');
      case 'sedan':
        return CARS_DATA.filter((c) => c.category === 'sedans' || c.series.includes('7') || c.series.includes('5'));
      case 'coupe':
        return CARS_DATA.filter((c) => c.name.toLowerCase().includes('coupé') || c.name.toLowerCase().includes('coupe') || c.series.includes('M4') || c.series.includes('M2'));
      case 'convertible':
        return CARS_DATA.filter((c) => c.name.toLowerCase().includes('convertible') || c.name.toLowerCase().includes('kabriolet'));
      case 'touring':
        return CARS_DATA.filter((c) => c.name.toLowerCase().includes('touring') || c.series.includes('X5') || c.series.includes('X7'));
      case 'electric':
        return CARS_DATA.filter((c) => c.category === 'bmw-i' || c.badge?.toLowerCase().includes('hybrid') || c.badge?.toLowerCase().includes('electric'));
      case 'm-power':
        return CARS_DATA.filter((c) => c.category === 'm-power');
      case 'alpina':
        return CARS_DATA.filter((c) => c.series.includes('7') || c.series.includes('M8'));
      default:
        return CARS_DATA;
    }
  }, [activeCategory]);

  const handleCarClick = (car: Car) => {
    onClose();
    onSelectCar(car.id);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllCategory = (cat: MegaMenuCategory) => {
    onClose();
    if (cat === 'suv') onSelectCategory('x-series');
    else if (cat === 'electric') onSelectCategory('bmw-i');
    else if (cat === 'm-power') onSelectCategory('m-power');
    else if (cat === 'sedan') onSelectCategory('sedans');
    else onSelectCategory('all');

    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 top-[60px] sm:top-[72px] z-40 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Mega Menu Window */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[60px] sm:top-[72px] z-50 bg-[#0E0F12] border-b border-white/10 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* Header with Close */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    BMW Rasmiy Katalogi
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C69D4]" />
                  <span className="text-xs text-neutral-400">
                    {filteredCars.length} ta model
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Menyuni yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mega Menu Layout: 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Category Sidebar */}
                <div className="md:col-span-3 border-r border-white/10 pr-0 md:pr-6 flex flex-col justify-between">
                  <div className="space-y-1">
                    {MENU_CATEGORIES.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                            isActive
                              ? 'bg-white/10 text-white font-semibold'
                              : 'text-neutral-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1C69D4]" />
                            )}
                            {cat.label}
                            {cat.badge}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isActive
                                ? 'text-white translate-x-0.5'
                                : 'text-neutral-600'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Inventory Card (as seen in screenshot 2) */}
                  <div
                    onClick={() => handleViewAllCategory('all')}
                    className="mt-6 p-3 rounded-xl bg-[#16171B] border border-white/10 hover:border-white/30 transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                      <Image
                        src="https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331L%25LayVd4Ws8wSRCzgqHyAL5lQa7sYeySzoVBzcAiN3lZyaBNODXYunWqR5Q53yxpYmrfZ7dWcMKHS94mvhD%25VicdTjO3gXA9bLL10tN2ZR5EiyhPS5qwlGmIqQ53nqPR9ayV7tQMw1p8ac1QUDCPbxbUx5WGe89GsLsbbUiprJqT9Gw6ZuLmMptYRSF3y67m5VKJXYCygNWusmlTv0PGdyX324bOQTQdjcyQt3azDxTa6dnkq83pgzOALUd1%25kIFJGzEQABKupklNFeWS6AFQKMPVY8weWhbNmUhIPo90yGCBbHi4Tpzt9%25wc36sciftxdYrIw178zQIftECUkaRU7slGAn5SCrXpFONflZQ6KIOmXRaYWBHOQ5nmPeLmagOybLKBnvIT9JWTO2B3iuZZIjedwSUBBDMztVAmeqhrhPeEQm2awpfQ53RpsBeayVOJx3w1pqSWvFSrW2vEyXqcfbYGWHRBDFBfpCb9EiyElNZkscCRbz1vbwx65efVubbWCmnvzIc1QrO2kn9MOXId4pvnWhcnzIWGjuekx97"
                        alt="Do'kon inventarizatsiyasi"
                        fill
                        className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-[#38bdf8] flex items-center gap-1">
                        Do‘kon inventarizatsiyasi
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Mavjud avtomobillarni ko‘rish
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Models 3-Column Grid (as seen in screenshot 2) */}
                <div className="md:col-span-9">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-300">
                      {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.label || 'Barcha Modellar'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleViewAllCategory(activeCategory)}
                      className="text-xs font-medium text-[#38bdf8] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      Barchasini ko‘rish
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                    {filteredCars.map((car) => {
                      return (
                        <div
                          key={car.id}
                          onClick={() => handleCarClick(car)}
                          className="group p-3 rounded-xl bg-[#141518] hover:bg-[#1A1C21] border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        >
                          {/* Car Cutout Render */}
                          <div className="relative h-20 sm:h-24 w-full overflow-hidden">
                            <Image
                              src={car.heroImage}
                              alt={car.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 33vw"
                              className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Model Label and Short Info */}
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                                {car.series}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors truncate">
                                {car.name.replace('BMW ', '')}
                              </h4>
                            </div>
                            <span className="text-[10px] font-semibold text-neutral-300 bg-white/5 px-2 py-0.5 rounded shrink-0">
                              {car.specs.power.split(' ')[0]} ot
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
