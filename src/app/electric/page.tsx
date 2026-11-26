'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { CARS_DATA } from '@/data/cars';
import { CarCard } from '@/components/catalog/CarCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Zap, BatteryCharging, Gauge, Shield, ArrowRight, Sparkles } from 'lucide-react';

function ElectricContent() {
  const { openTestDrive, openCarDetail, openCompare, favoriteIds, toggleFavorite } = useSiteModal();

  const electricCars = CARS_DATA.filter((car) => car.category === 'bmw-i');

  return (
    <div className="pt-24 pb-20">
      {/* Electric Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-[#060D1A] via-[#0A0A0C] to-[#0A0A0C] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066B1]/20 blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <Badge variant="outline" className="px-3.5 py-1 text-[#38bdf8] border-[#0066B1]/40">
              <Zap className="w-3.5 h-3.5 mr-1 inline text-[#38bdf8]" />
              BMW i — To‘liq Elektr Harakat
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              Kelejak Elektrda. <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#0066B1] to-white bg-clip-text text-transparent">
                His Tuyg‘u BMW’da.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl leading-relaxed">
              BMW i avlodining sof elektr texnologiyalari: 625 kilometrgacha bir quvvatlanishda masofa, bir zumda yetib keluvchi maksimal tortish kuchi va ultra-tezkor DC zaryadlash stansiyalari.
            </p>
          </div>

          {/* Electric Highlights Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-[#0066B1]/20 text-[#38bdf8] flex items-center justify-center mb-4">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">625 km</h3>
              <p className="text-xs text-neutral-400 mt-1">
                WLTP standarti bo‘yicha maksimal elektr masofa (BMW i7 xDrive60)
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-[#0066B1]/20 text-[#38bdf8] flex items-center justify-center mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-[#38bdf8]">34 daqiqa</h3>
              <p className="text-xs text-neutral-400 mt-1">
                10% dan 80% gacha tezkor yuqori quvvatli DC zaryadlash vaqti
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-[#0066B1]/20 text-[#38bdf8] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">8 Yil / 160,000 km</h3>
              <p className="text-xs text-neutral-400 mt-1">
                BMW rasmiy yuqori voltli akkumulyator batareyasi kafolati
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Electric Cars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              BMW i Elektr Modellari
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Mutlaq jimlik, maksimal qulaylik va ekologik tozalik uyg‘unligi
            </p>
          </div>
          <Link
            href="/models"
            className="text-xs text-[#38bdf8] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Barcha modellarni ko‘rish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {electricCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={(c) => openCarDetail(c)}
              onBookTestDrive={(c, color) => openTestDrive(c.id, color)}
              isFavorite={favoriteIds.includes(car.id)}
              onToggleFavorite={toggleFavorite}
              onCompare={(carId) => openCompare([carId])}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ElectricPage() {
  return (
    <SiteLayout>
      <ElectricContent />
    </SiteLayout>
  );
}
