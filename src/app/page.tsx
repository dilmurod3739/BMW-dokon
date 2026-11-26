'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CARS_DATA } from '@/data/cars';
import { formatPrice } from '@/lib/utils';
import { SiteLayout, useSiteModal } from '@/components/layout/SiteLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { CtaBanner } from '@/components/home/CtaBanner';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Sliders,
  Calculator,
  Zap,
  Building2,
  Shield,
  Gauge,
} from 'lucide-react';

function HomeContent() {
  const router = useRouter();
  const { openTestDrive, openCarDetail } = useSiteModal();

  const featuredCars = CARS_DATA.slice(0, 3);

  return (
    <main className="flex-1">
      {/* 1. Cinematic Hero Section with Welcome Light Background */}
      <HeroSection
        onExploreModels={() => router.push('/models')}
        onOpenTestDrive={() => openTestDrive()}
      />

      {/* 2. Flagships Showcase & Direct Links to Separate Pages */}
      <section className="py-24 sm:py-32 bg-[#0E0F12] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-3">
                BMW Flagmanlari
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                Yangi Avlod <br />
                <span className="text-neutral-400">Modellar Qatori</span>
              </h2>
            </div>

            <Link
              href="/models"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#38bdf8] transition-colors group"
            >
              <span>Barcha modellarni ko‘rish ({CARS_DATA.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Featured Cars Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                onClick={() => openCarDetail(car)}
                className="bg-[#121316] border border-white/10 rounded-2xl p-6 hover:border-white/25 transition-all shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full mb-4">
                    <Image
                      src={car.heroImage}
                      alt={car.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                    {car.series}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{car.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{car.tagline}</p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Narxi</span>
                    <span className="text-sm font-bold text-white">{formatPrice(car.price)}</span>
                  </div>
                  <span className="text-xs text-[#38bdf8] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Batafsil &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dedicated Pages Portal Hub (Interactive Cards to Separate Pages) */}
      <section className="py-24 bg-[#0A0A0C] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              BMW Tajribasi
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mt-2">
              Sayt Bo‘limlarini Kashf Eting
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Salon va Qulaylik */}
            <Link
              href="/interior"
              className="bg-[#121316] border border-white/10 rounded-2xl p-7 hover:border-[#1C69D4]/60 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C69D4]/15 text-[#38bdf8] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Salon va Qulaylik
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  4 xil original BMW charm salon ranglari, panoramali BMW Curved Display va Bowers & Wilkins akustikasi bilan alohida sahifada tanishing.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#38bdf8] gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Interyerni ko‘rish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 2. O‘zingiznikini Yarating (Konfigurator) */}
            <Link
              href="/configurator"
              className="bg-[#121316] border border-white/10 rounded-2xl p-7 hover:border-white/30 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  O‘zingiznikini Yarating
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Interaktiv 3D Studio konfiguratori: bo‘yoqlar, g‘ildirak disklari va individual jihozlarni o‘zingiz rejalashtiring.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-white gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Konfiguratorni ochish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 3. Xarid Qilish (Kalkulyator) */}
            <Link
              href="/finance"
              className="bg-[#121316] border border-white/10 rounded-2xl p-7 hover:border-[#0066B1]/60 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0066B1]/20 text-[#38bdf8] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Xarid Qilish & Lizing
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  BMW Financial Services kalkulyatori orqali qulay oylik to‘lov va boshlang‘ich to‘lov parametrlarini hisoblang va ariza yuboring.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#38bdf8] gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Kalkulyatorga o‘tish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 4. Elektr (BMW i) */}
            <Link
              href="/electric"
              className="bg-[#121317] border border-white/10 rounded-2xl p-7 hover:border-[#0066B1]/60 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0066B1]/20 text-[#38bdf8] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Elektr (BMW i)
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  BMW i7 va i4 sof elektr flagmanlari, 625 kilometrgacha masofa va yuqori quvvatli DC zaryadlash stansiyalari haqida to‘liq ma’lumot.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#38bdf8] gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Elektr modellar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 5. Biz Haqimizda */}
            <Link
              href="/about"
              className="bg-[#121316] border border-white/10 rounded-2xl p-7 hover:border-white/30 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Biz Haqimizda & Dilerlar
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  100 yildan ortiq Bavariya avtomobilsozlik merosi hamda O‘zbekistondagi rasmiy dilerlik markazlari manzillari va aloqa telefonlari.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-white gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Dilerlarni ko‘rish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* 6. Barcha Modellar */}
            <Link
              href="/models"
              className="bg-[#121316] border border-white/10 rounded-2xl p-7 hover:border-[#1C69D4]/60 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C69D4]/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gauge className="w-6 h-6 text-[#1C69D4]" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  To‘liq Katalog
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  BMW M Power, BMW i, X Seriyasi va Sedanlar — barcha rasmiy narxlar, filtrlash va xususiyatlar bilan tanishing.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-[#38bdf8] gap-1 group-hover:translate-x-1.5 transition-transform">
                <span>Katalogga o‘tish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Call To Action Banner */}
      <CtaBanner
        onOpenTestDrive={() => openTestDrive()}
        onExploreModels={() => router.push('/models')}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <SiteLayout>
      <HomeContent />
    </SiteLayout>
  );
}
