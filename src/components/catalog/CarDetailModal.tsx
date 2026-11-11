'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, CarColor } from '@/types/car';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SpecsGrid } from './SpecsGrid';
import { formatPrice } from '@/lib/utils';
import {
  getColorBlendMode,
  getColorTintOpacity,
  getAmbientUnderglowBackground,
  getPaintFinishType,
  hexToRgba,
} from '@/lib/colorUtils';
import { Check, Sparkles, Phone } from 'lucide-react';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(initialColorIndex);

  // Reset or sync when car or initialColorIndex changes
  React.useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColorIndex(initialColorIndex ?? 0);
  }, [car, initialColorIndex]);

  if (!car) return null;

  const currentImage = car.gallery[selectedImageIndex] || car.heroImage;
  const activeColor =
    car.colors?.[selectedColorIndex] ||
    car.colors?.[0] || { name: 'Alpine White', hex: '#FFFFFF' };
  const isInterior = currentImage.toLowerCase().includes('interior');

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
        {/* Main Gallery Display */}
        <div className="space-y-3">
          <div
            className="relative h-64 sm:h-84 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 isolate transition-shadow duration-500"
            style={{
              boxShadow: `0 15px 40px -10px ${hexToRgba(activeColor.hex, 0.4)}`,
            }}
          >
            <Image
              src={currentImage}
              alt={`${car.name} — ${activeColor.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transition-all duration-500"
            />

            {/* Ambient Ground Underglow / Reflection Halo (Cross-fading) */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`modal-underglow-${car.id}-${activeColor.hex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-28 pointer-events-none blur-2xl"
                style={{
                  background: getAmbientUnderglowBackground(activeColor.hex, 0.85),
                }}
              />
            </AnimatePresence>

            {/* Vehicle Color Tint Overlay (Exterior only, Cross-fading) */}
            {!isInterior && (
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`modal-tint-${car.id}-${activeColor.hex}-${selectedImageIndex}`}
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
            )}

            {/* Specular Sheen / Reflection Overlay */}
            {!isInterior && (
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`modal-sheen-${car.id}-${activeColor.hex}-${selectedImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(
                      activeColor.hex,
                      0.25
                    )} 0%, transparent 45%, ${hexToRgba(activeColor.hex, 0.18)} 100%)`,
                    mixBlendMode: 'soft-light',
                  }}
                />
              </AnimatePresence>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Active Color Badge */}
            <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/15 flex items-center gap-2 shadow-lg transition-all duration-300">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm transition-colors duration-300"
                style={{ backgroundColor: activeColor.hex }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeColor.name}
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold"
                >
                  {activeColor.name}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] text-neutral-400 font-mono">
                {activeColor.hex}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
              Rasm {selectedImageIndex + 1} / {car.gallery.length}
            </div>
          </div>

          {/* Thumbnails */}
          {car.gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
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

        {/* Color Palette Selector with Live Swatches */}
        <div
          className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 transition-all duration-500"
          style={{
            boxShadow: `inset 0 0 25px ${hexToRgba(activeColor.hex, 0.15)}`,
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Tana rangi (Mavjud variantlar):</span>
              <span
                className="w-2.5 h-2.5 rounded-full transition-colors duration-300 shadow-sm"
                style={{ backgroundColor: activeColor.hex }}
              />
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                {getPaintFinishType(activeColor.name)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeColor.name}
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-bold text-white tracking-wide"
                >
                  {activeColor.name}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-neutral-300 border border-white/10">
                {activeColor.hex}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            {car.colors.map((color, idx) => {
              const isSelected = selectedColorIndex === idx;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  aria-label={`Rangni tanlash: ${color.name}`}
                  data-testid={`modal-color-${idx}`}
                  className={`relative w-9 h-9 rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer active:scale-95 ${
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
                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Technical Specifications */}
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
