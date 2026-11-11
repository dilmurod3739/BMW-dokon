'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarColor } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { formatPrice } from '@/lib/utils';
import {
  getColorBlendMode,
  getColorTintOpacity,
  getAmbientUnderglowBackground,
  getPaintFinishType,
  hexToRgba,
} from '@/lib/colorUtils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Gauge,
  Flame,
  Zap,
  Check,
  Share2,
  Calendar,
  Eye,
  Sliders,
} from 'lucide-react';

interface ConfiguratorStudioProps {
  initialCarId?: string;
  onBookTestDrive: (car: Car, selectedColor?: CarColor) => void;
  onViewDetails?: (car: Car, initialColorIndex?: number) => void;
}

export function ConfiguratorStudio({
  initialCarId,
  onBookTestDrive,
  onViewDetails,
}: ConfiguratorStudioProps) {
  const [selectedCarId, setSelectedCarId] = useState<string>(
    initialCarId || CARS_DATA[0].id
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);
  const [copiedToast, setCopiedToast] = useState(false);

  // Sync state if initialCarId prop changes dynamically
  React.useEffect(() => {
    if (initialCarId) {
      setSelectedCarId(initialCarId);
      setSelectedColorIndex(0);
      setSelectedViewIndex(0);
    }
  }, [initialCarId]);

  const currentCar =
    CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  // Reset color & view when changing car
  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    setSelectedColorIndex(0);
    setSelectedViewIndex(0);
  };

  const activeColor =
    currentCar.colors?.[selectedColorIndex] ||
    currentCar.colors?.[0] || { name: 'Alpine White', hex: '#FFFFFF' };

  const currentImage =
    currentCar.gallery[selectedViewIndex] || currentCar.heroImage;
  const isInterior = currentImage.toLowerCase().includes('interior');

  const handleShareConfig = async () => {
    const text = `BMW ${currentCar.name} — Rangi: ${activeColor.name} (${activeColor.hex}) | Narxi: ${formatPrice(currentCar.price)}`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 3000);
      }
    } catch {
      // Fallback
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <section
      id="configurator"
      className="py-24 sm:py-32 bg-[#0A0A0C] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Dynamic Ambient Aura (Cross-fading) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`studio-aura-${activeColor.hex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none blur-[180px]"
          style={{
            backgroundColor: activeColor.hex,
          }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium mb-4">
            <Sliders className="w-3.5 h-3.5 text-[#1C69D4]" />
            <span>BMW Individual Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Shaxsiy <span className="text-[#38bdf8]">Konfigurator</span> Studio
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            BMW flagman modellarini tanlang, premium rang palitrasini jonli
            almashtiring va tana tusini real vaqtda his eting.
          </p>
        </div>

        {/* Model Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin no-scrollbar justify-start sm:justify-center">
          {CARS_DATA.map((car) => {
            const isSelected = car.id === currentCar.id;
            return (
              <button
                key={car.id}
                type="button"
                onClick={() => handleSelectCar(car.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {car.series} · {car.name.split(' ')[1] || car.name}
              </button>
            );
          })}
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Car Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visual Canvas Stage with Isolated Stacking Context */}
            <div
              className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#14161b] via-[#0f1115] to-[#0A0A0C] border border-white/10 isolate transition-shadow duration-700 flex items-center justify-center p-4 sm:p-8"
              style={{
                boxShadow: `0 25px 60px -15px ${hexToRgba(
                  activeColor.hex,
                  0.45
                )}, inset 0 0 50px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Studio Ceiling Lights & Vignette */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

              {/* Pedestal Ground Ring with Dynamic Glow */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`studio-pedestal-${activeColor.hex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-full border border-white/5 pointer-events-none"
                  style={{
                    boxShadow: `0 0 35px ${hexToRgba(activeColor.hex, 0.35)}`,
                  }}
                />
              </AnimatePresence>

              {/* Live Ambient Underglow Halo / Floor Reflection (Cross-fading) */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`studio-underglow-${currentCar.id}-${activeColor.hex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-5/6 h-32 pointer-events-none blur-3xl"
                  style={{
                    background: getAmbientUnderglowBackground(activeColor.hex, 0.9),
                  }}
                />
              </AnimatePresence>

              {/* Main Vehicle Image */}
              <div className="relative w-full h-full">
                <Image
                  src={currentImage}
                  alt={`${currentCar.name} — ${activeColor.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="object-contain object-center transition-all duration-700"
                />

                {/* Real-time Vehicle Paint Tint Overlay (Exterior only, Cross-fading) */}
                {!isInterior && (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`studio-tint-${currentCar.id}-${activeColor.hex}-${selectedViewIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: getColorTintOpacity(activeColor.hex) }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundColor: activeColor.hex,
                        mixBlendMode: getColorBlendMode(activeColor.hex),
                      }}
                    />
                  </AnimatePresence>
                )}

                {/* Specular Sheen / Metallic Glint Layer */}
                {!isInterior && (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`studio-sheen-${currentCar.id}-${activeColor.hex}-${selectedViewIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(125deg, ${hexToRgba(
                          activeColor.hex,
                          0.3
                        )} 0%, transparent 40%, ${hexToRgba(
                          activeColor.hex,
                          0.22
                        )} 85%)`,
                        mixBlendMode: 'soft-light',
                      }}
                    />
                  </AnimatePresence>
                )}
              </div>

              {/* Top Floating Badge with Selected Color Info */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-20">
                <Badge
                  variant={
                    currentCar.category === 'm-power'
                      ? 'm-power'
                      : currentCar.category === 'bmw-i'
                      ? 'electric'
                      : 'default'
                  }
                >
                  {currentCar.badge || currentCar.series}
                </Badge>
              </div>

              {/* Top Right: Live Color Pill with Animated Label */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white flex items-center gap-2.5 shadow-xl transition-all duration-300 z-20">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-md transition-colors duration-500"
                  style={{
                    backgroundColor: activeColor.hex,
                    boxShadow: `0 0 10px ${activeColor.hex}`,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeColor.name}
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold"
                  >
                    {activeColor.name}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {activeColor.hex}
                </span>
              </div>

              {/* Bottom Perspective Switcher Buttons */}
              {currentCar.gallery.length > 1 && (
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                  <div className="bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 flex items-center gap-1 shadow-lg">
                    {currentCar.gallery.map((_, idx) => {
                      const labels = ['Old ko‘rinish', 'Burchak', 'Interyer'];
                      const isSelected = selectedViewIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedViewIndex(idx)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-bold shadow'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {labels[idx] || `Ko‘rinish ${idx + 1}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Studio Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Model Title & Price */}
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#1C69D4]">
                {currentCar.series} Seriyasi
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {currentCar.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 line-clamp-2">
                {currentCar.tagline}
              </p>
            </div>

            {/* COLOR PALETTE CONTROLLER */}
            <div className="p-5 rounded-2xl bg-[#121316] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                    BMW Individual Bo‘yoq Turlari:
                  </span>
                  <span className="text-[11px] text-[#38bdf8] font-medium">
                    {getPaintFinishType(activeColor.name)}
                  </span>
                </div>
                <div className="text-right">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeColor.name}
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 2 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-bold text-white block"
                    >
                      {activeColor.name}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {activeColor.hex}
                  </span>
                </div>
              </div>

              {/* Swatches Grid */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {currentCar.colors.map((color, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      title={`${color.name} (${color.hex})`}
                      aria-label={`Tanlangan rang: ${color.name}`}
                      data-testid={`studio-color-${idx}`}
                      className={`relative w-11 h-11 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'border-white scale-110 shadow-xl ring-4 ring-white/20'
                          : 'border-white/20 hover:scale-105 opacity-75 hover:opacity-100 hover:border-white/50'
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: isSelected
                          ? `0 0 20px ${hexToRgba(
                              color.hex,
                              0.95
                            )}, 0 0 6px #ffffff`
                          : undefined,
                      }}
                    >
                      {isSelected && (
                        <Check className="w-5 h-5 text-white absolute inset-0 m-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#1C69D4]" />
                <span>
                  Rang ustiga bosing — avtomobil tusi va refleksiya silliq
                  o‘zgaradi.
                </span>
              </div>
            </div>

            {/* Quick Performance Specs */}
            <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 flex items-center justify-center gap-1">
                  <Gauge className="w-3 h-3 text-[#E2231A]" /> 0-100
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {currentCar.specs.acceleration}
                </span>
              </div>
              <div className="border-x border-white/5">
                <span className="text-[10px] uppercase text-neutral-400 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Quvvat
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {currentCar.specs.power.split(' ')[0]} o.k.
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-400 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-[#0066B1]" /> Tezlik
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {currentCar.specs.topSpeed}
                </span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-2 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  Jami Boshlang‘ich Narxi:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {formatPrice(currentCar.price)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={
                    currentCar.category === 'm-power'
                      ? 'm-power'
                      : currentCar.category === 'bmw-i'
                      ? 'electric'
                      : 'primary'
                  }
                  size="lg"
                  onClick={() => onBookTestDrive(currentCar, activeColor)}
                  leftIcon={<Calendar className="w-4 h-4" />}
                  className="w-full text-xs sm:text-sm font-bold rounded-xl shadow-lg"
                >
                  Ushbu Rangda Bron Qilish
                </Button>

                <div className="flex gap-2">
                  {onViewDetails && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() =>
                        onViewDetails(currentCar, selectedColorIndex)
                      }
                      leftIcon={<Eye className="w-4 h-4" />}
                      className="flex-1 text-xs sm:text-sm rounded-xl"
                    >
                      Detallar
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleShareConfig}
                    title="Konfiguratsiyadan nusxa olish"
                    className="px-4 rounded-xl"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>

              {copiedToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium transition-all animate-fadeIn">
                  ✓ Konfiguratsiya ma’lumotlari buferga nusxalandi!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
