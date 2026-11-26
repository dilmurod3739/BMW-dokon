'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarColor, CarInteriorColor } from '@/types/car';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SpecsGrid } from './SpecsGrid';
import { formatPrice } from '@/lib/utils';
import {
  getAmbientUnderglowBackground,
  getPaintFinishType,
  hexToRgba,
} from '@/lib/colorUtils';
import { Check, Sparkles, Phone, Tv, Music, Gamepad2, Sparkle } from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTestDrive: (car: Car, selectedColor?: CarColor) => void;
  initialColorIndex?: number;
}

export function CarDetailModal({
  car,
  isOpen,
  onClose,
  onBookTestDrive,
  initialColorIndex = 0,
}: CarDetailModalProps) {
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(initialColorIndex);
  const [selectedInteriorIndex, setSelectedInteriorIndex] = useState(0);

  // Reset or sync when car or initialColorIndex changes
  React.useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColorIndex(initialColorIndex ?? 0);
    setSelectedInteriorIndex(0);
    setViewMode('exterior');
  }, [car, initialColorIndex]);

  if (!car) return null;

  const activeColor =
    car.colors?.[selectedColorIndex] ||
    car.colors?.[0] || { name: 'Alpine White', hex: '#FFFFFF' };

  const activeInterior: CarInteriorColor =
    car.interiorColors?.[selectedInteriorIndex] ||
    car.interiorColors?.[0] || {
      name: 'Black Extended Merino Leather',
      material: 'BMW Individual Merino charm',
      hex: '#151619',
      image: '/images/cars/interior.jpg',
    };

  const displayedImage =
    viewMode === 'interior'
      ? activeInterior.image
      : selectedImageIndex === 0
      ? (activeColor.image || car.heroImage)
      : (car.gallery[selectedImageIndex] || car.heroImage);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <span>{car.name}</span>
          <Badge
            variant={
              car.category === 'm-power'
                ? 'm-power'
                : car.category === 'bmw-i'
                ? 'electric'
                : 'default'
            }
          >
            {car.badge || car.series}
          </Badge>
        </div>
      }
      description={car.tagline}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Exterior vs Interior Mode Switcher Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/60 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setViewMode('exterior');
                setSelectedImageIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'exterior'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>🚗 Eksteryer (Kuzov)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('interior')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'interior'
                  ? 'bg-[#1C69D4] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>💺 Salon & Qulaylik</span>
            </button>
          </div>

          <span className="text-[11px] text-neutral-400 font-medium">
            {viewMode === 'exterior'
              ? `${car.colors.length} xil kuzov bo‘yog‘i`
              : `${car.interiorColors?.length || 4} xil salon charm qoplamasi`}
          </span>
        </div>

        {/* Main Display Stage */}
        <div className="space-y-3">
          <div
            className="relative h-64 sm:h-88 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 isolate transition-shadow duration-500"
            style={{
              boxShadow: `0 15px 40px -10px ${
                viewMode === 'exterior'
                  ? hexToRgba(activeColor.hex, 0.4)
                  : hexToRgba(activeInterior.hex, 0.5)
              }`,
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`modal-img-${car.id}-${viewMode}-${displayedImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={displayedImage}
                  alt={`${car.name} — ${viewMode === 'exterior' ? activeColor.name : activeInterior.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={viewMode === 'interior' ? 'object-cover' : 'object-contain object-center'}
                />
              </motion.div>
            </AnimatePresence>

            {/* Ambient Ground Reflection Underglow */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`modal-underglow-${car.id}-${viewMode}-${viewMode === 'exterior' ? activeColor.hex : activeInterior.hex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none blur-2xl"
                style={{
                  background: getAmbientUnderglowBackground(
                    viewMode === 'exterior' ? activeColor.hex : activeInterior.hex,
                    0.6
                  ),
                }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Active Color Pill */}
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/15 flex items-center gap-2 shadow-lg transition-all duration-300">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm transition-colors duration-300"
                style={{
                  backgroundColor: viewMode === 'exterior' ? activeColor.hex : activeInterior.hex,
                }}
              />
              <span className="font-semibold">
                {viewMode === 'exterior' ? activeColor.name : activeInterior.name}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-neutral-300 border border-white/10">
              {viewMode === 'exterior'
                ? `Kuzov bo‘yog‘i (${selectedColorIndex + 1}/${car.colors.length})`
                : `Salon charm qoplamasi (${selectedInteriorIndex + 1}/${car.interiorColors?.length || 4})`}
            </div>
          </div>

          {/* Exterior Gallery Thumbnails (only in exterior mode) */}
          {viewMode === 'exterior' && car.gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
              {car.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#1C69D4] scale-105 shadow-md'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${car.name} preview ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* EXTERIOR COLOR SELECTOR (When in Exterior View) */}
        {viewMode === 'exterior' && (
          <div
            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 transition-all duration-500"
            style={{
              boxShadow: `inset 0 0 25px ${hexToRgba(activeColor.hex, 0.15)}`,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">
                  Tana rangi ({car.colors.length} ta variant):
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                  {getPaintFinishType(activeColor.name)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  {activeColor.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-neutral-300 border border-white/10">
                  {activeColor.hex}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {car.colors.map((color, idx) => {
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setSelectedImageIndex(0);
                    }}
                    aria-label={`Rangni tanlash: ${color.name}`}
                    data-testid={`modal-color-${idx}`}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/20 hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: isSelected
                        ? `0 0 16px ${hexToRgba(color.hex, 0.95)}, 0 0 4px #ffffff`
                        : undefined,
                    }}
                    title={`${color.name} (${color.hex})`}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* INTERIOR COLOR & MATERIAL SELECTOR (When in Interior View) */}
        {viewMode === 'interior' && car.interiorColors && (
          <div
            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 transition-all duration-500"
            style={{
              boxShadow: `inset 0 0 25px ${hexToRgba(activeInterior.hex, 0.2)}`,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">
                  Salon qoplamasi (4 xil orginal charm turi):
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: activeInterior.hex }}
                />
                <span className="text-[10px] uppercase tracking-wider text-[#38bdf8] font-bold">
                  {activeInterior.material}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">
                  {activeInterior.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-neutral-300 border border-white/10">
                  {activeInterior.hex}
                </span>
              </div>
            </div>

            {/* 4 Interior Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {car.interiorColors.map((ic, idx) => {
                const isSelected = selectedInteriorIndex === idx;
                return (
                  <button
                    key={ic.name}
                    type="button"
                    onClick={() => setSelectedInteriorIndex(idx)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white bg-white/10 shadow-lg'
                        : 'border-white/10 bg-black/30 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full shrink-0 border border-white/30 shadow-sm"
                      style={{ backgroundColor: ic.hex }}
                    />
                    <div className="truncate">
                      <span className="text-[11px] font-bold text-white block truncate">
                        {ic.name.split(' ')[0]} {ic.name.split(' ')[1] || ''}
                      </span>
                      <span className="text-[9px] text-neutral-400 block truncate">
                        {ic.material}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* LUXURY INTERIOR & COMFORT SHOWCASE (As requested by user & images) */}
        {viewMode === 'interior' && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-[#1C69D4]" />
              Salon Qulayliklari va Innovatsion Texnologiyalari
            </h4>

            {/* Visual Comfort Suite Banner from BMW USA */}
            <div className="relative w-full h-32 sm:h-44 rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/images/interiors/luxury-comfort-suite.jpg"
                alt="BMW Luxury Comfort and Tech Suite"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-neutral-300 backdrop-blur-md bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                  BMW Live Cockpit Professional & Comfort Suite
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Feature 1: Curved Display */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-white">
                  <Tv className="w-4 h-4 text-[#0066B1]" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    BMW Curved Display
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  12.3 dyuymli raqamli asboblar paneli va 14.9 dyuymli markaziy sensorli displey bitta zamonaviy egilgan panoramali oynada birlashtirilgan.
                </p>
              </div>

              {/* Feature 2: Bowers & Wilkins Audio */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-white">
                  <Music className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Bowers & Wilkins Diamond Surround
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  1965 Vt quvvat, 30 ta dinamik va eshik panellariga o‘rnatilgan zanglamas po‘latdan yasalgan, dinamik yoritiluvchi akustik panjaralar.
                </p>
              </div>

              {/* Feature 3: Interaction Bar */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 text-[#E2231A]" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    BMW Interaction Bar
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Kristalli ko‘rinishdagi interaktiv yoritish paneli salonda dinamik ambient atmosferasini yaratadi va iqlim boshqaruvini ta’minlaydi.
                </p>
              </div>

              {/* Feature 4: AirConsole Gaming & Streaming */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-white">
                  <Gamepad2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    AirConsole O‘yinlari & Striming
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Avtomobil to‘xtab turganda smartfonni joystik sifatida ulab, Curved Display orqali do‘stlar bilan birgalikda o‘yin o‘ynash imkoniyati.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Full Technical Specifications (Shown in Exterior View) */}
        {viewMode === 'exterior' && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Texnik Xususiyatlar
            </h4>
            <SpecsGrid specs={car.specs} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">
                  Dvigatel / Kuch uzatmasi:
                </span>
                <span className="text-xs font-semibold text-white mt-1 block">
                  {car.specs.engine}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">
                  Yoqilg‘i sarfi / Elektr masofa:
                </span>
                <span className="text-xs font-semibold text-[#38bdf8] mt-1 block">
                  {car.specs.range || 'Noma’lum'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Description & Key Highlights */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Tavsif & Xususiyatlar
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {car.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {car.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-neutral-300 bg-white/5 p-2.5 rounded-lg border border-white/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1C69D4] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & CTA Action Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-neutral-400 block">Boshlang‘ich narx:</span>
            <span className="text-2xl font-black text-white">
              {formatPrice(car.price)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={onClose}
              className="w-1/2 sm:w-auto"
            >
              Yopish
            </Button>
            <Button
              variant={
                car.category === 'm-power'
                  ? 'm-power'
                  : car.category === 'bmw-i'
                  ? 'electric'
                  : 'primary'
              }
              size="md"
              onClick={() => {
                onClose();
                onBookTestDrive(car, activeColor);
              }}
              leftIcon={<Phone className="w-4 h-4" />}
              className="w-1/2 sm:w-auto font-semibold"
            >
              Test-Drive Tanlash
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
