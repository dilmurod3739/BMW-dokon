'use client';

import * as React from 'react';
import Image from 'next/image';
import { CARS_DATA } from '@/data/cars';
import { Car } from '@/types/car';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Heart, Trash2, ArrowRight, Gauge, Zap, Scale } from 'lucide-react';

interface GarageModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  onToggleFavorite: (carId: string) => void;
  onClearFavorites: () => void;
  onViewDetails: (car: Car) => void;
  onBookTestDrive: (car: Car) => void;
  onOpenCompare: (carIds: string[]) => void;
}

export function GarageModal({
  isOpen,
  onClose,
  favoriteIds,
  onToggleFavorite,
  onClearFavorites,
  onViewDetails,
  onBookTestDrive,
  onOpenCompare,
}: GarageModalProps) {
  const favoriteCars = CARS_DATA.filter((c) => favoriteIds.includes(c.id));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mening BMW Garajim"
      description="Sizga yoqqan va saqlangan flagman avtomobillar to‘plami"
      maxWidth="3xl"
    >
      <div className="space-y-6 pt-2">
        {favoriteCars.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Garajingiz hozircha bo‘sh
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
              Sevimli BMW modellaringizni saqlab qo‘yish uchun katalogdagi yurakcha belgisini bosing.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-neutral-400">
                Saqlangan modellar soni:{' '}
                <strong className="text-white">{favoriteCars.length} ta</strong>
              </span>

              <div className="flex items-center gap-3">
                {favoriteCars.length >= 2 && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onOpenCompare([favoriteCars[0].id, favoriteCars[1].id]);
                    }}
                    leftIcon={<Scale className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    Solishtirish ({favoriteCars.length})
                  </Button>
                )}

                <button
                  type="button"
                  onClick={onClearFavorites}
                  className="text-neutral-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Tozalash</span>
                </button>
              </div>
            </div>

            {/* List of Saved Cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {favoriteCars.map((car) => (
                <div
                  key={car.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-black/40">
                      <Image
                        src={car.heroImage}
                        alt={car.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                        {car.series}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {car.name}
                      </h4>
                      <p className="text-xs font-semibold text-neutral-300">
                        {formatPrice(car.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(car.id)}
                      className="text-red-400 hover:text-red-500 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                      title="Garajdan olib tashlash"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specs & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                    <span>⚡ {car.specs.acceleration}</span>
                    <span>🏎️ {car.specs.power}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onClose();
                        onViewDetails(car);
                      }}
                      className="text-xs py-1.5"
                    >
                      Batafsil
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        onClose();
                        onBookTestDrive(car);
                      }}
                      className="text-xs py-1.5"
                    >
                      Test-Drive
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
