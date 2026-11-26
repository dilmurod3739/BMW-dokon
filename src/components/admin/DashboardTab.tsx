'use client';

import * as React from 'react';
import Image from 'next/image';
import { BookingLead, AdminMetrics, AdminTab } from '@/types/admin';
import { CARS_DATA, DEALERSHIPS } from '@/data/cars';
import { formatPrice } from '@/lib/utils';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Car,
  Building2,
  ChevronRight,
  Zap,
  Gauge,
  Phone,
  Sparkles,
} from 'lucide-react';

interface DashboardTabProps {
  metrics: AdminMetrics;
  bookings: BookingLead[];
  onNavigateTab: (tab: AdminTab) => void;
  onUpdateStatus: (id: string, status: BookingLead['status']) => void;
}

export function DashboardTab({
  metrics,
  bookings,
  onNavigateTab,
  onUpdateStatus,
}: DashboardTabProps) {
  const recentBookings = bookings.slice(0, 5);

  const mPowerCars = CARS_DATA.filter((c) => c.category === 'm-power');
  const electricCars = CARS_DATA.filter((c) => c.category === 'bmw-i');
  const xSeriesCars = CARS_DATA.filter((c) => c.category === 'x-series');
  const sedanCars = CARS_DATA.filter((c) => c.category === 'sedans');

  return (
    <div className="space-y-8">
      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Jami Arizalar */}
        <div className="bg-[#121317] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Jami Arizalar
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#1C69D4]/15 text-[#38bdf8] flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics.totalBookings}</span>
            <span className="text-xs text-neutral-400">ta so‘rov</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
            <span>Onlayn sinov haydashi</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 100% Faol
            </span>
          </div>
        </div>

        {/* Card 2: Kutilayotganlar */}
        <div className="bg-[#121317] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Kutilmoqda
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400">
              {metrics.pendingBookings}
            </span>
            <span className="text-xs text-neutral-400">ko‘rib chiqilishi kerak</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
            <span>Menejer qo‘ng‘irog‘i</span>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-[#38bdf8] hover:underline font-semibold cursor-pointer"
            >
              Ko‘rish &rarr;
            </button>
          </div>
        </div>

        {/* Card 3: Tasdiqlanganlar */}
        <div className="bg-[#121317] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Tasdiqlangan
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">
              {metrics.confirmedBookings}
            </span>
            <span className="text-xs text-neutral-400">jadvalga qo‘shilgan</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
            <span>Bajarilgan: {metrics.completedBookings}</span>
            <span className="text-neutral-300 font-semibold">Dilerlik markazida</span>
          </div>
        </div>

        {/* Card 4: Katalog Qiymati */}
        <div className="bg-[#121317] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Katalog Parki
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {metrics.totalCatalogCars}
            </span>
            <span className="text-xs text-neutral-400">ta rasmiy model</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
            <span>Jami qiymat:</span>
            <span className="text-white font-bold">
              {formatPrice(metrics.totalCatalogValueUSD)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Bookings & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Bookings Table (8 Cols) */}
        <div className="lg:col-span-8 bg-[#121317] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                So‘nggi Arizalar
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Onlayn tizim orqali yuborilgan yangi mijoz murojaatlari
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('bookings')}
              className="text-xs text-[#38bdf8] hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <span>Barchasini ko‘rish ({bookings.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <th className="pb-3 pl-2">Mijoz</th>
                  <th className="pb-3">Tanlangan Model</th>
                  <th className="pb-3">Sana</th>
                  <th className="pb-3">Holat</th>
                  <th className="pb-3 text-right pr-2">Tezkor Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {recentBookings.map((b) => {
                  const car = CARS_DATA.find((c) => c.id === b.carId);
                  return (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pl-2">
                        <div className="font-semibold text-white">{b.fullName}</div>
                        <a
                          href={`tel:${b.phone}`}
                          className="text-[11px] text-neutral-400 hover:text-[#38bdf8] flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-2.5 h-2.5" />
                          <span>{b.phone}</span>
                        </a>
                      </td>

                      <td className="py-3.5">
                        <div className="font-medium text-white flex items-center gap-2">
                          {car?.heroImage && (
                            <div className="w-8 h-5 relative rounded bg-black/40 overflow-hidden shrink-0">
                              <Image
                                src={car.heroImage}
                                alt={car.name}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                          )}
                          <span className="truncate max-w-[160px]">{car?.name || b.carId}</span>
                        </div>
                      </td>

                      <td className="py-3.5 text-neutral-300 whitespace-nowrap">
                        {b.preferredDate}
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'completed'
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                              : b.status === 'cancelled'
                              ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {b.status === 'confirmed'
                            ? 'Tasdiqlandi'
                            : b.status === 'completed'
                            ? 'Bajarildi'
                            : b.status === 'cancelled'
                            ? 'Bekor qilindi'
                            : 'Kutilmoqda'}
                        </span>
                      </td>

                      <td className="py-3.5 text-right pr-2">
                        {b.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => onUpdateStatus(b.id, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            Tasdiqlash
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigateTab('bookings')}
                            className="text-neutral-400 hover:text-white text-[11px] font-medium"
                          >
                            Batafsil
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: BMW Flot Kategoriya Taqsimoti (4 Cols) */}
        <div className="lg:col-span-4 bg-[#121317] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Modellar Taqsimoti
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Katalogdagi segmentlar va ularning ulushi
            </p>
          </div>

          <div className="space-y-4">
            {/* Category: M Power */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  BMW M Motorsport ({mPowerCars.length} ta)
                </span>
                <span className="text-neutral-400">
                  {Math.round((mPowerCars.length / CARS_DATA.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full"
                  style={{ width: `${(mPowerCars.length / CARS_DATA.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Category: BMW i (Electric) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0066B1]" />
                  BMW i Elektr ({electricCars.length} ta)
                </span>
                <span className="text-neutral-400">
                  {Math.round((electricCars.length / CARS_DATA.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-[#0066B1] rounded-full"
                  style={{ width: `${(electricCars.length / CARS_DATA.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Category: X Series */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  BMW X Krosshoverlar ({xSeriesCars.length} ta)
                </span>
                <span className="text-neutral-400">
                  {Math.round((xSeriesCars.length / CARS_DATA.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-[#1C69D4] rounded-full"
                  style={{ width: `${(xSeriesCars.length / CARS_DATA.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Category: Sedans */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  BMW Hashamatli Sedanlar ({sedanCars.length} ta)
                </span>
                <span className="text-neutral-400">
                  {Math.round((sedanCars.length / CARS_DATA.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(sedanCars.length / CARS_DATA.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Dealership Quick Info */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#38bdf8]" />
              Rasmiy Dilerlik Markazlari ({DEALERSHIPS.length})
            </h3>
            <div className="space-y-2">
              {DEALERSHIPS.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5"
                >
                  <span className="text-white font-medium">{d.name}</span>
                  <span className="text-neutral-400">{d.city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
