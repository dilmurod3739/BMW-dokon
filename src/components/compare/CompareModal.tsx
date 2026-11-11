'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { CARS_DATA } from '@/data/cars';
import { Car } from '@/types/car';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Scale, Zap, Gauge, Sparkles, Check, ChevronRight } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCarIds?: string[];
  onBookTestDrive: (car: Car) => void;
}

export function CompareModal({
  isOpen,
  onClose,
  initialCarIds,
  onBookTestDrive,
}: CompareModalProps) {
  const [car1Id, setCar1Id] = useState<string>(
    initialCarIds?.[0] || CARS_DATA[0].id
  );
  const [car2Id, setCar2Id] = useState<string>(
    initialCarIds?.[1] || CARS_DATA[1].id
  );

  const car1 = CARS_DATA.find((c) => c.id === car1Id) || CARS_DATA[0];
  const car2 = CARS_DATA.find((c) => c.id === car2Id) || CARS_DATA[1];

  const parseNumber = (str: string) => {
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const car1Accel = parseNumber(car1.specs.acceleration);
  const car2Accel = parseNumber(car2.specs.acceleration);

  const car1Power = parseNumber(car1.specs.power);
  const car2Power = parseNumber(car2.specs.power);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="BMW Modellarini Taqqoslash"
      description="Flagman modellar xarakteristikalari va dinamikasini yonma-yon solishtiring"
      maxWidth="4xl"
    >
      <div className="space-y-6 pt-2">
        {/* Car Selectors & Cards Header */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {/* Car 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                1-modelni tanlang:
              </label>
              <select
                value={car1Id}
                onChange={(e) => setCar1Id(e.target.value)}
                className="w-full bg-[#1A1C23] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#1C69D4]"
              >
                {CARS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="relative h-28 sm:h-40 w-full rounded-xl overflow-hidden mt-3 bg-black/40">
                <Image
                  src={car1.heroImage}
                  alt={car1.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  {car1.series} • {car1.category.toUpperCase()}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                  {car1.name}
                </h4>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  {formatPrice(car1.price)}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onBookTestDrive(car1);
              }}
              className="mt-4 w-full text-xs font-bold"
            >
              Ushbu modelga yozilish
            </Button>
          </div>

          {/* Car 2 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                2-modelni tanlang:
              </label>
              <select
                value={car2Id}
                onChange={(e) => setCar2Id(e.target.value)}
                className="w-full bg-[#1A1C23] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-[#1C69D4]"
              >
                {CARS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="relative h-28 sm:h-40 w-full rounded-xl overflow-hidden mt-3 bg-black/40">
                <Image
                  src={car2.heroImage}
                  alt={car2.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  {car2.series} • {car2.category.toUpperCase()}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                  {car2.name}
                </h4>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  {formatPrice(car2.price)}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onBookTestDrive(car2);
              }}
              className="mt-4 w-full text-xs font-bold"
            >
              Ushbu modelga yozilish
            </Button>
          </div>
        </div>

        {/* Detailed Specs Comparison Rows */}
        <div className="bg-[#121316] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 text-xs sm:text-sm">
          {/* Acceleration 0-100 */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center">
            <span
              className={`font-bold ${
                car1Accel < car2Accel
                  ? 'text-emerald-400'
                  : 'text-neutral-300'
              }`}
            >
              {car1.specs.acceleration}
              {car1Accel < car2Accel && (
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Tezroq
                </span>
              )}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              0 — 100 km/soat
            </span>
            <span
              className={`text-right font-bold ${
                car2Accel < car1Accel
                  ? 'text-emerald-400'
                  : 'text-neutral-300'
              }`}
            >
              {car2.specs.acceleration}
              {car2Accel < car1Accel && (
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Tezroq
                </span>
              )}
            </span>
          </div>

          {/* Horsepower */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center bg-white/[0.02]">
            <span
              className={`font-bold ${
                car1Power > car2Power
                  ? 'text-[#38bdf8]'
                  : 'text-neutral-300'
              }`}
            >
              {car1.specs.power}
              {car1Power > car2Power && (
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#0066B1]/20 text-[#38bdf8]">
                  Kuchliroq
                </span>
              )}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Dvigatel quvvati
            </span>
            <span
              className={`text-right font-bold ${
                car2Power > car1Power
                  ? 'text-[#38bdf8]'
                  : 'text-neutral-300'
              }`}
            >
              {car2.specs.power}
              {car2Power > car1Power && (
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-[#0066B1]/20 text-[#38bdf8]">
                  Kuchliroq
                </span>
              )}
            </span>
          </div>

          {/* Top Speed */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center">
            <span className="font-semibold text-neutral-200">
              {car1.specs.topSpeed}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Maksimal tezlik
            </span>
            <span className="text-right font-semibold text-neutral-200">
              {car2.specs.topSpeed}
            </span>
          </div>

          {/* Torque */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center bg-white/[0.02]">
            <span className="font-semibold text-neutral-200">
              {car1.specs.torque}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Aylantiruvchi moment
            </span>
            <span className="text-right font-semibold text-neutral-200">
              {car2.specs.torque}
            </span>
          </div>

          {/* Range / Consumption */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center">
            <span className="font-semibold text-neutral-200">
              {car1.specs.range}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Masofa / Sarf
            </span>
            <span className="text-right font-semibold text-neutral-200">
              {car2.specs.range}
            </span>
          </div>

          {/* Drivetrain */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center bg-white/[0.02]">
            <span className="font-medium text-neutral-300 text-xs truncate">
              {car1.specs.drivetrain}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Uzatma turi
            </span>
            <span className="text-right font-medium text-neutral-300 text-xs truncate">
              {car2.specs.drivetrain}
            </span>
          </div>

          {/* Engine */}
          <div className="p-3 sm:p-4 grid grid-cols-3 items-center">
            <span className="font-medium text-neutral-300 text-xs truncate">
              {car1.specs.engine}
            </span>
            <span className="text-center text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Motor / Quvvat qurilmasi
            </span>
            <span className="text-right font-medium text-neutral-300 text-xs truncate">
              {car2.specs.engine}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
