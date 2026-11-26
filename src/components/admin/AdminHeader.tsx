'use client';

import * as React from 'react';
import { AdminTab } from '@/types/admin';
import { CARS_DATA } from '@/data/cars';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Calendar, Bell } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenNewBookingModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  pendingCount: number;
}

export function AdminHeader({
  activeTab,
  onOpenNewBookingModal,
  searchQuery,
  onSearchChange,
  pendingCount,
}: AdminHeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Boshqaruv Paneli',
          subtitle: 'BMW avtosaloni ko‘rsatkichlari, mijoz arizalari va umumiy statistika',
        };
      case 'bookings':
        return {
          title: 'Test-Drive & Mijoz Arizalari',
          subtitle: 'Onlayn kelib tushgan barcha sinov haydashi va lizing so‘rovlari ro‘yxati',
        };
      case 'cars':
        return {
          title: 'Avtomobillar Katalogi',
          subtitle: `${CARS_DATA.length} ta rasmiy BMW flagman modellari, texnik xarakteristikalari va narxlari`,
        };
      case 'dealerships':
        return {
          title: 'Dilerlik Markazlari',
          subtitle: 'O‘zbekistondagi rasmiy vakolatxonalar va ularning mas’ul menejerlari',
        };
    }
  };

  const { title, subtitle } = getTabTitle();
  const todayDate = new Date().toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="bg-[#0D0E12] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
          {title}
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input for Bookings / Cars */}
        {(activeTab === 'bookings' || activeTab === 'cars') && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Qidirish..."
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4] focus:ring-1 focus:ring-[#1C69D4] w-48 sm:w-64"
            />
          </div>
        )}

        {/* Date pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300">
          <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>{todayDate}</span>
        </div>

        {/* Action Button: Manual Add Lead */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenNewBookingModal}
          leftIcon={<Plus className="w-4 h-4" />}
          className="text-xs font-bold"
        >
          Yangi Ariza
        </Button>
      </div>
    </header>
  );
}
