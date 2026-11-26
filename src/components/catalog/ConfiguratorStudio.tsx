'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarColor, CarInteriorColor } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { formatPrice } from '@/lib/utils';
import {
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
  Eye,
  Sliders,
  Tv,
  Music,
  Gamepad2,
  Sparkle,
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
  const [customizationTab, setCustomizationTab] = useState<'paint' | 'interior'>('paint');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedInteriorIndex, setSelectedInteriorIndex] = useState<number>(0);
  const [selectedViewIndex, setSelectedViewIndex] = useState<number>(0);
  const [copiedToast, setCopiedToast] = useState(false);

  // Sync state if initialCarId prop changes dynamically
  React.useEffect(() => {
    if (initialCarId) {
      setSelectedCarId(initialCarId);
      setSelectedColorIndex(0);
      setSelectedInteriorIndex(0);
      setSelectedViewIndex(0);
    }
  }, [initialCarId]);

  const currentCar =
    CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  // Reset color & view when changing car
  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    setSelectedColorIndex(0);
    setSelectedInteriorIndex(0);
    setSelectedViewIndex(0);
  };

  const activeColor =
    currentCar.colors?.[selectedColorIndex] ||
    currentCar.colors?.[0] || { name: 'Alpine White', hex: '#FFFFFF' };

  const activeInterior: CarInteriorColor =
    currentCar.interiorColors?.[selectedInteriorIndex] ||
    currentCar.interiorColors?.[0] || {
      name: 'Black Extended Merino Leather',
      material: 'BMW Individual Merino charm',
      hex: '#151619',
      image: '/images/cars/interior.jpg',
    };

  const currentImage =
    customizationTab === 'interior'
      ? activeInterior.image
      : selectedViewIndex === 0
      ? (activeColor.image || currentCar.heroImage)
      : (currentCar.gallery[selectedViewIndex] || currentCar.heroImage);

  const activeHex = customizationTab === 'interior' ? activeInterior.hex : activeColor.hex;

  const handleShareConfig = async () => {
    const text = `BMW ${currentCar.name} — Kuzov: ${activeColor.name} | Salon: ${activeInterior.name} (${activeInterior.material}) | Boshlang‘ich narxi: ${formatPrice(currentCar.price)}`;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 3000);
      }
    } catch {
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
          key={`studio-ambient-${currentCar.id}-${customizationTab}-${activeHex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{
            backgroundColor: activeHex,
          }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge variant="outline" className="px-3 py-1">
                <Sliders className="w-3.5 h-3.5 text-[#1C69D4] mr-1 inline" />
                Interaktiv Studio Konfiguratori
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Shaxsiy BMW <br />
              <span className="text-neutral-400">Dizayningizni Yarating</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl">
              Modelni tanlang, rasmiy BMW bo‘yoqlarini sinab ko‘ring va 4 xil hashamatli salon charm qoplamasi hamda qulayliklarini kashf eting.
            </p>
          </div>

          {/* Quick Model Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin">
            {CARS_DATA.map((car) => {
              const isSelected = car.id === selectedCarId;
              return (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => handleSelectCar(car.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {car.series}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Studio Canvas Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="relative h-[340px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#131417] via-[#0E0F12] to-[#0A0A0C] border border-white/10 isolate shadow-2xl flex items-center justify-center transition-all duration-500"
              style={{
                boxShadow: `0 25px 60px -20px ${hexToRgba(activeHex, 0.4)}`,
              }}
            >
              {/* Studio Grid Floor Background */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Main Vehicle Image Layer (Cross-fading) */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`studio-img-${currentCar.id}-${customizationTab}-${currentImage}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-8"
                >
                  <Image
                    src={currentImage}
                    alt={`${currentCar.name} — ${customizationTab === 'interior' ? activeInterior.name : activeColor.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className={customizationTab === 'interior' ? 'object-cover rounded-2xl' : 'object-contain object-center'}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Ambient Underglow / Ground Reflection Layer (Cross-fading) */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`studio-underglow-${currentCar.id}-${activeHex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none blur-3xl"
                  style={{
                    background: getAmbientUnderglowBackground(activeHex, 0.75),
                  }}
                />
              </AnimatePresence>

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
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
                    backgroundColor: activeHex,
                    boxShadow: `0 0 10px ${activeHex}`,
                  }}
                />
                <span className="font-bold">
                  {customizationTab === 'interior' ? activeInterior.name : activeColor.name}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {activeHex}
                </span>
              </div>
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

            {/* CUSTOMIZATION CONTROLLER TABS */}
            <div className="p-5 rounded-2xl bg-[#121316] border border-white/10 space-y-4">
              {/* Tab Selector: Kuzov vs Salon */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-black/60 border border-white/10">
                <button
                  type="button"
                  onClick={() => setCustomizationTab('paint')}
                  className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    customizationTab === 'paint'
                      ? 'bg-white text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>🎨 Kuzov Bo‘yog‘i ({currentCar.colors.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizationTab('interior')}
                  className={`w-1/2 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    customizationTab === 'interior'
                      ? 'bg-[#1C69D4] text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>💺 Salon Qoplamasi ({currentCar.interiorColors?.length || 4})</span>
                </button>
              </div>

              {/* 1. EXTERIOR PAINT TAB CONTENT */}
              {customizationTab === 'paint' && (
                <div className="space-y-3">
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
                      <span className="text-sm font-bold text-white block">
                        {activeColor.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {activeColor.hex}
                      </span>
                    </div>
                  </div>

                  {/* Swatches Grid */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {currentCar.colors.map((color, idx) => {
                      const isSelected = selectedColorIndex === idx;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => {
                            setSelectedColorIndex(idx);
                            setSelectedViewIndex(0);
                          }}
                          title={`${color.name} (${color.hex})`}
                          aria-label={`Tanlangan rang: ${color.name}`}
                          data-testid={`studio-color-${idx}`}
                          className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'border-white scale-110 shadow-xl ring-4 ring-white/20'
                              : 'border-white/20 hover:scale-105 opacity-75 hover:opacity-100 hover:border-white/50'
                          }`}
                          style={{
                            backgroundColor: color.hex,
                            boxShadow: isSelected
                              ? `0 0 20px ${hexToRgba(color.hex, 0.95)}, 0 0 6px #ffffff`
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
                </div>
              )}

              {/* 2. INTERIOR SALON TAB CONTENT */}
              {customizationTab === 'interior' && currentCar.interiorColors && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                        Salon Charm Qoplamasi:
                      </span>
                      <span className="text-[11px] text-[#38bdf8] font-bold">
                        {activeInterior.material}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white block">
                        {activeInterior.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {activeInterior.hex}
                      </span>
                    </div>
                  </div>

                  {/* 4 Interior Swatches */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {currentCar.interiorColors.map((ic, idx) => {
                      const isSelected = selectedInteriorIndex === idx;
                      return (
                        <button
                          key={ic.name}
                          type="button"
                          onClick={() => setSelectedInteriorIndex(idx)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg ring-2 ring-white/30'
                              : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full shrink-0 border border-white/30 shadow-md"
                            style={{ backgroundColor: ic.hex }}
                          />
                          <div className="truncate">
                            <span className="text-xs font-bold text-white block truncate">
                              {ic.name.split(' ')[0]} {ic.name.split(' ')[1] || ''}
                            </span>
                            <span className="text-[10px] text-neutral-400 block truncate">
                              {ic.material}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interior Comfort Highlights Bar */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2 mt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                      <Sparkle className="w-3.5 h-3.5 text-[#1C69D4]" />
                      Salon Qulayliklari:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Tv className="w-3.5 h-3.5 text-[#0066B1] shrink-0" />
                        <span>Curved Display</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                        <span>Bowers & Wilkins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E2231A] shrink-0" />
                        <span>Interaction Bar</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>AirConsole O‘yinlari</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

            {/* Price & Primary Call to Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#16171B] to-[#121316] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">
                    Boshlang‘ich konfiguratsiya narxi:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(currentCar.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareConfig}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer relative"
                    title="Konfiguratsiyani ulashish"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedToast && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded border border-white/20 whitespace-nowrap shadow-lg">
                        Nusxa olindi!
                      </span>
                    )}
                  </button>

                  {onViewDetails && (
                    <button
                      type="button"
                      onClick={() => onViewDetails(currentCar, selectedColorIndex)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                      title="Barcha xususiyatlarni ko‘rish"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold"
                  onClick={() =>
                    onBookTestDrive(
                      currentCar,
                      activeColor
                    )
                  }
                >
                  Ushbu Konfiguratsiyada Test-Drive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
