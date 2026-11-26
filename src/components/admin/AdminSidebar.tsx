'use client';

import * as React from 'react';
import Link from 'next/link';
import { BmwLogo } from '@/components/ui/BmwLogo';
import { AdminTab } from '@/types/admin';
import {
  LayoutDashboard,
  ClipboardList,
  Car,
  Building2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  pendingCount: number;
  totalCarsCount: number;
  onLogout?: () => void;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  pendingCount,
  totalCarsCount,
  onLogout,
}: AdminSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Boshqaruv Paneli',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'bookings' as AdminTab,
      label: 'Test-Drive & Arizalar',
      icon: ClipboardList,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    },
    {
      id: 'cars' as AdminTab,
      label: 'Modellar Katalogi',
      icon: Car,
      badge: totalCarsCount,
      badgeColor: 'bg-white/10 text-neutral-300',
    },
    {
      id: 'dealerships' as AdminTab,
      label: 'Dilerlik Markazlari',
      icon: Building2,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-[#0B0C0E] border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <BmwLogo className="w-9 h-9 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-base tracking-wider uppercase">
                BMW Admin
              </span>
              <span className="w-2 h-2 rounded-full bg-[#1C69D4] animate-pulse" />
            </div>
            <p className="text-[10px] tracking-widest uppercase text-neutral-500 font-medium">
              Boshqaruv Tizimi
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Asosiy Bo‘limlar
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C69D4] text-white shadow-lg shadow-[#1C69D4]/25'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {/* Return to Main Site */}
        <Link
          href="/"
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Asosiy Saytga O‘tish</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
        </Link>

        {/* Admin User Card & Logout */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#1C69D4]/20 border border-[#1C69D4]/40 text-[#38bdf8] flex items-center justify-center font-bold text-xs shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">BMW Diler Admin</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Faol (Online)
              </p>
            </div>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
              title="Tizimdan chiqish (Qulflash)"
              aria-label="Tizimdan chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
