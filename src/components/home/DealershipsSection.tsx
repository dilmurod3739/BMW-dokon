'use client';

import * as React from 'react';
import { DEALERSHIPS } from '@/data/cars';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export function DealershipsSection({
  onBookTestDrive,
}: {
  onBookTestDrive: () => void;
}) {
  return (
    <section id="dealerships" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">
              Rasmiy Vakolatxonalar
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              O‘zbekistondagi <br />
              <span className="text-[#1C69D4]">BMW Dilerlik Markazlari</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400">
              Yuksak xizmat ko‘rsatish madaniyati, individual maslahatlar va sinovdan o‘tkazish uchun eng yangi BMW modellari kutmoqda.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={onBookTestDrive}
            className="self-start md:self-auto border-white/20"
          >
            Markazga yozilish
          </Button>
        </div>

        {/* Dealerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALERSHIPS.map((dealer) => (
            <div
              key={dealer.id}
              className="p-6 rounded-2xl bg-[#121316] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] bg-[#0066B1]/15 px-3 py-1 rounded-full border border-[#0066B1]/30">
                    {dealer.city}
                  </span>
                  <Navigation className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1C69D4] transition-colors">
                    {dealer.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#1C69D4] shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Phone className="w-3.5 h-3.5 text-[#1C69D4]" />
                    Aloqa:
                  </span>
                  <a
                    href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
                    className="font-semibold text-white hover:text-[#38bdf8] transition-colors"
                  >
                    {dealer.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    Ish vaqti:
                  </span>
                  <span className="text-neutral-300">Har kuni: 09:00 — 20:00</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
