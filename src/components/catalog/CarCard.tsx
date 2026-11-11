'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarColor } from '@/types/car';
import { formatPrice } from '@/lib/utils';
import {
  getColorBlendMode,
  getColorTintOpacity,
  getAmbientUnderglowBackground,
  hexToRgba,
} from '@/lib/colorUtils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Gauge, Zap, Flame, Eye, ArrowUpRight, Heart, Scale } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car, initialColorIndex?: number) => void;
  onBookTestDrive: (car: Car, selectedColor?: CarColor) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (carId: string) => void;
  onCompare?: (carId: string) => void;
}

export function CarCard({
  car,
  onViewDetails,
  onBookTestDrive,
  isFavorite = false,
  onToggleFavorite,
  onCompare,
}: CarCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Reset selected color when the car prop changes
  React.useEffect(() => {
    setSelectedColorIndex(0);
  }, [car.id]);

  const activeColor =
    car.colors?.[selectedColorIndex] ||
    car.colors?.[0] || { name: 'Alpine White', hex: '#FFFFFF' };

  const getBadgeVariant = () => {
    if (car.category === 'm-power') return 'm-power';
    if (car.category === 'bmw-i') return 'electric';
    return 'default';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#121316] border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
      style={{
        boxShadow: `0 15px 35px -15px ${hexToRgba(activeColor.hex, 0.35)}`,
      }}
    >
      <div>
        {/* Top Image Stage Container with Isolated Stacking Context */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900 isolate">
          <Image
            src={car.heroImage}
            alt={`${car.name} — ${activeColor.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Ambient Underglow / Ground Reflection Layer (Cross-fading) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`card-underglow-${car.id}-${activeColor.hex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none blur-xl"
              style={{
                background: getAmbientUnderglowBackground(activeColor.hex, 0.8),
              }}
            />
          </AnimatePresence>

          {/* Vehicle Color Tint Overlay (Cross-fading with specific blend mode) */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`card-tint-${car.id}-${activeColor.hex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: getColorTintOpacity(activeColor.hex) }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: activeColor.hex,
                mixBlendMode: getColorBlendMode(activeColor.hex),
              }}
            />
          </AnimatePresence>

          {/* Specular Sheen / Metallic Reflection */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`card-sheen-${car.id}-${activeColor.hex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${hexToRgba(
                  activeColor.hex,
                  0.22
                )} 0%, transparent 45%, ${hexToRgba(activeColor.hex, 0.18)} 100%)`,
                mixBlendMode: 'soft-light',
              }}
            />
          </AnimatePresence>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/40 pointer-events-none" />

          {/* Top Badges and Action Icons */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
            <div className="pointer-events-none">
              <Badge variant={getBadgeVariant()}>
                {car.badge || car.series}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5">
              {car.featured && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white text-black shadow-md pointer-events-none">
                  Top Model
                </span>
              )}

              {onCompare && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompare(car.id);
                  }}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white transition-all active:scale-90 cursor-pointer"
                  title="Solishtirish"
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>
              )}

              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(car.id);
                  }}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 transition-all active:scale-90 cursor-pointer"
                  title={isFavorite ? "Garajdan olib tashlash" : "Garajga saqlash"}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFavorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Color Preview Swatches & Active Color Name Bar */}
          <div
            className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clickable Swatches */}
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/15 shadow-lg">
              {car.colors.map((c, idx) => {
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColorIndex(idx);
                    }}
                    title={c.name}
                    aria-label={`${car.name} rangi: ${c.name}`}
                    data-testid={`car-card-color-${car.id}-${idx}`}
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer active:scale-90 ${
                      isSelected
                        ? 'scale-125 ring-2 ring-white shadow-md'
                        : 'hover:scale-110 opacity-70 hover:opacity-100 ring-1 ring-white/30'
                    }`}
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: isSelected
                        ? `0 0 10px ${hexToRgba(c.hex, 0.9)}`
                        : undefined,
                    }}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Color Name Pill with Animated Label */}
            <div
              className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] text-neutral-200 font-medium truncate max-w-[155px] flex items-center gap-1.5 shadow-lg transition-all duration-300"
              title={activeColor.name}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-sm transition-colors duration-300"
                style={{ backgroundColor: activeColor.hex }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeColor.name}
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="truncate"
                >
                  {activeColor.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
              {car.series} Seriyasi
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#38bdf8] transition-colors">
              {car.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
              {car.tagline}
            </p>
          </div>

          {/* Quick Specs Pill Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-500 flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-[#E2231A]" /> 0-100
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {car.specs.acceleration}
              </span>
            </div>

            <div className="flex flex-col border-x border-white/5">
              <span className="text-[10px] uppercase text-neutral-500 flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Quvvat
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {car.specs.power.split(' ')[0]} o.k.
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-500 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-[#0066B1]" />{' '}
                {car.category === 'bmw-i' ? 'Masofa' : 'Sarf'}
              </span>
              <span
                className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate px-1"
                title={car.specs.range}
              >
                {car.category === 'bmw-i'
                  ? car.specs.range?.split('(')[0]?.trim() || car.specs.range
                  : car.specs.range?.split('/')[0]?.trim() || car.specs.range}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-neutral-400">Boshlang‘ich narxi:</span>
            <span className="text-lg font-black text-white tracking-tight">
              {formatPrice(car.price)}{' '}
              <span className="text-xs font-normal text-neutral-400">dan</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(car, selectedColorIndex)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="text-xs rounded-xl"
        >
          Batafsil
        </Button>
        <Button
          type="button"
          variant={
            car.category === 'm-power'
              ? 'm-power'
              : car.category === 'bmw-i'
              ? 'electric'
              : 'secondary'
          }
          size="sm"
          onClick={() => onBookTestDrive(car, activeColor)}
          rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          className="text-xs rounded-xl"
        >
          Test-Drive
        </Button>
      </div>
    </motion.div>
  );
}
