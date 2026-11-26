'use client';

import * as React from 'react';
import { DEALERSHIPS } from '@/data/cars';
import { BookingLead } from '@/types/admin';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  UserCheck,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

interface DealershipsTabProps {
  bookings: BookingLead[];
}

export function DealershipsTab({ bookings }: DealershipsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEALERSHIPS.map((dealer) => {
          const branchBookings = bookings.filter((b) => b.dealershipId === dealer.id);
          const pendingCount = branchBookings.filter((b) => b.status === 'pending').length;
          const confirmedCount = branchBookings.filter((b) => b.status === 'confirmed').length;

          return (
            <div
              key={dealer.id}
              className="bg-[#121317] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5 hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#1C69D4]" />
                    {dealer.city}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {dealer.name}
                  </h3>
                </div>

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mt-1" />
              </div>

              {/* Contact & Address Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 text-neutral-300">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{dealer.address}</span>
                </div>

                <div className="flex items-center gap-2.5 text-neutral-300">
                  <Phone className="w-4 h-4 text-[#1C69D4] shrink-0" />
                  <a
                    href={`tel:${dealer.phone}`}
                    className="font-semibold text-white hover:text-[#38bdf8] transition-colors"
                  >
                    {dealer.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-neutral-400">
                  <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Dushanba - Shanba: 09:00 - 20:00</span>
                </div>
              </div>

              {/* Active Bookings Metric for this branch */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block uppercase">Kutilayotgan</span>
                  <span className="text-lg font-black text-amber-400">{pendingCount}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-neutral-400 block uppercase">Tasdiqlangan</span>
                  <span className="text-lg font-black text-emerald-400">{confirmedCount}</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-neutral-400">
                <span>Jami arizalar soni:</span>
                <span className="text-white font-bold">{branchBookings.length} ta</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
