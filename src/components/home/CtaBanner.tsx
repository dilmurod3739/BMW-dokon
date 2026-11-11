'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Phone, ChevronRight } from 'lucide-react';

export function CtaBanner({
  onOpenTestDrive,
  onExploreModels,
}: {
  onOpenTestDrive: () => void;
  onExploreModels: () => void;
}) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black border-t border-white/10">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=2000&q=85"
          alt="BMW Performance Driving Experience"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1C69D4]" />
            Shaxsiy Sinov Haydashi
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Haydash Quvonchini <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              O‘zingiz His Qiling
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            Orzuingizdagi BMW flagmanini o‘zingiz xohlagan vaqtda va sizga eng yaqin dilerlik markazida individual test-drive qiling. Bizning mutaxassislar barcha texnik savollaringizga to‘liq javob beradi.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button
              variant="m-power"
              size="lg"
              onClick={onOpenTestDrive}
              leftIcon={<Phone className="w-4 h-4" />}
              className="px-8 py-4 font-bold uppercase tracking-wider text-xs sm:text-sm"
            >
              Test-Drive ga Yozilish
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onExploreModels}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="px-8 py-4 text-xs sm:text-sm border-white/20 hover:border-white/40"
            >
              Katalogni Ko‘rish
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
