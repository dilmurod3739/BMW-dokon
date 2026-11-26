'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarInteriorColor } from '@/types/car';
import { CARS_DATA } from '@/data/cars';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { hexToRgba, getAmbientUnderglowBackground } from '@/lib/colorUtils';
import {
  Tv,
  Music,
  Sparkles,
  Gamepad2,
  Check,
  ArrowRight,
  ShieldCheck,
  Eye,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface InteriorSectionProps {
  onBookTestDrive?: (carId: string, interiorColor?: CarInteriorColor) => void;
  onViewDetails?: (car: Car) => void;
}

export function InteriorSection({
  onBookTestDrive,
  onViewDetails,
}: InteriorSectionProps) {
  // Filter cars that have interiorColors configured
  const interiorCars = useMemo(() => {
    return CARS_DATA.filter(
      (car) => car.interiorColors && car.interiorColors.length >= 4
    );
  }, []);

  const [selectedCarId, setSelectedCarId] = useState<string>(
    interiorCars[0]?.id || 'bmw-m8-gran-coupe'
  );
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);

  const selectedCar = useMemo(() => {
    return interiorCars.find((c) => c.id === selectedCarId) || interiorCars[0];
  }, [interiorCars, selectedCarId]);

  const activeInterior = useMemo(() => {
    if (!selectedCar?.interiorColors?.length) return null;
    return (
      selectedCar.interiorColors[selectedColorIdx] ||
      selectedCar.interiorColors[0]
    );
  }, [selectedCar, selectedColorIdx]);

  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    setSelectedColorIdx(0);
  };

  if (!selectedCar || !activeInterior) return null;

  return (
    <section
      id="interior"
      className="py-24 bg-[#0A0A0C] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Glow matching selected interior leather color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-25"
        style={{
          background: getAmbientUnderglowBackground(activeInterior.hex, 0.4),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="electric" className="px-3.5 py-1 text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#38bdf8]" />
            Rasmiy BMW Kokpit & Salon
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            BMW Salon Qulayliklari va{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38bdf8] to-[#1C69D4]">
              Interaktiv Kokpit
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Rasmiy BMW USA konfiguratoridan olingan 4 xil original charm ranglari,
            panoramali BMW Curved Display va studiya darajasidagi Bowers & Wilkins akustikasi bilan tanishing.
          </p>
        </div>

        {/* 1. MODEL SELECTOR TABS */}
        <div className="mb-8">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {interiorCars.slice(0, 7).map((car) => {
              const isSelected = car.id === selectedCar.id;
              return (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => handleSelectCar(car.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-lg shadow-white/10 scale-105'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {car.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN COCKPIT STAGE */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#14161A] to-[#0D0E11] p-4 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: HD Cockpit Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCar.id}-${activeInterior.name}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeInterior.image}
                      alt={`${selectedCar.name} - ${activeInterior.name}`}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient underglow on bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none transition-all duration-500"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.9), ${hexToRgba(activeInterior.hex, 0.25)}, transparent)`,
                  }}
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/60 border border-white/15 text-white flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Kokpit Salon Ko‘rinishi
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono backdrop-blur-md bg-black/60 border border-white/10 text-neutral-300">
                    {selectedCar.name}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
                  <div className="backdrop-blur-md bg-black/75 px-3 py-2 rounded-xl border border-white/15">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Tanlangan interyer qoplamasi
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: activeInterior.hex }}
                      />
                      <span>{activeInterior.name}</span>
                    </div>
                    <div className="text-[11px] text-[#38bdf8]">
                      {activeInterior.material}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 backdrop-blur-md bg-black/75 px-3 py-2 rounded-xl border border-white/15 text-xs text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Rasmiy BMW Individual standarti</span>
                  </div>
                </div>
              </div>

              {/* 4 INTERIOR COLOR SWATCHES SELECTOR */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#1C69D4]" />
                    Salon rangini tanlang (4 xil orginal charm turi):
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {activeInterior.hex}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedCar.interiorColors?.map((ic, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={ic.name}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 relative ${
                          isSelected
                            ? 'bg-white/15 border-white shadow-lg scale-[1.02]'
                            : 'bg-black/30 border-white/10 hover:border-white/25 hover:bg-white/5'
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? `0 0 16px ${hexToRgba(ic.hex, 0.4)}`
                            : undefined,
                        }}
                      >
                        <span
                          className="w-8 h-8 rounded-full border-2 border-white/40 shadow-md shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: ic.hex }}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {ic.name.split(' ')[0]}
                          </span>
                          <span className="text-[10px] text-neutral-400 block truncate">
                            {ic.material.replace('BMW Individual ', '')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Salon Specs & Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                  Hashamatli qulaylik
                </span>
                <h3 className="text-2xl font-black text-white">
                  {selectedCar.name} Kokpiti
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Haydovchiga yo‘naltirilgan ergonomika, ko‘p nuqtali massaj o‘rindiqlari,
                  kristalli iDrive selektori va eng so‘nggi iDrive 8.5/9 operatsion tizimi.
                </p>
              </div>

              {/* Specs Pills */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Panoramik Displey:</span>
                  <span className="font-bold text-white">12.3" + 14.9" Curved</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Audio Tizim:</span>
                  <span className="font-bold text-white">Bowers & Wilkins 3D</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Ambient Yoritish:</span>
                  <span className="font-bold text-white">BMW Interaction Bar</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Multimedia:</span>
                  <span className="font-bold text-white">AirConsole Gaming</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    if (onBookTestDrive) {
                      onBookTestDrive(selectedCar.id, activeInterior);
                    }
                  }}
                  className="w-full shadow-lg shadow-[#1C69D4]/25"
                >
                  <span>Ushbu Salonda Test-Drive</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {onViewDetails && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onViewDetails(selectedCar)}
                    className="w-full border-white/15"
                  >
                    <span>To‘liq Ma’lumotlar</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMFORT & TECH 4-CARD SHOWCASE (Directly from user uploaded screenshots) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Rasmiy BMW Qulaylik va Multimedia Texnologiyalari
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Avtomobil ichida mutlaq hashamat va yuqori darajadagi boshqaruv erkinligi.
              </p>
            </div>
            <Badge variant="outline" className="self-start sm:self-auto border-white/20 text-neutral-300">
              4 Asosiy Yangilik
            </Badge>
          </div>

          {/* Visual Suite Banner */}
          <div className="relative w-full h-36 sm:h-52 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
            <Image
              src="/images/interiors/luxury-comfort-suite.jpg"
              alt="BMW Luxury Comfort Tech Suite"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/20 text-white">
                  BMW Curved Display & Center Console
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/20 text-white">
                  Bowers & Wilkins Sound
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/20 text-white">
                  Interaction Bar
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/20 text-white">
                  AirConsole Gaming
                </span>
              </div>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Curved Display */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/30 hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0066B1]/20 border border-[#0066B1]/40 flex items-center justify-center text-[#38bdf8]">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                BMW Curved Display
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                12.3 dyuymli raqamli asboblar paneli va 14.9 dyuymli axborot displeyi yaxlit egilgan panoramali oynada birlashtirilgan.
              </p>
            </div>

            {/* 2. Bowers & Wilkins */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/30 hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Music className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                Bowers & Wilkins Sound
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                30 tagacha akustik dinamik, 1965 Vt quvvat va metall panjaralari orqasidagi dinamik ambient yoritish bilan 3D konsert ovozi.
              </p>
            </div>

            {/* 3. Interaction Bar */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/30 hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                BMW Interaction Bar
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Kristalli fasetkali interaktiv panel: haydash rejimlariga (Sport, Eco, Relax) mos ravishda salon atmosferasini o‘zgartiradi.
              </p>
            </div>

            {/* 4. AirConsole Gaming */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/30 hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                AirConsole O‘yinlari
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Avtomobil to‘xtab turganda smartfonni pult sifatida ulab, do‘stlar bilan birga Curved Display ekranida o‘yin o‘ynash zavqi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
