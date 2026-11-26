'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { BookingLead, BookingStatus } from '@/types/admin';
import { CARS_DATA, DEALERSHIPS } from '@/data/cars';
import { Button } from '@/components/ui/Button';
import {
  Phone,
  Mail,
  Calendar,
  Building2,
  Trash2,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Car as CarIcon,
} from 'lucide-react';

interface BookingsTabProps {
  bookings: BookingLead[];
  searchQuery: string;
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onDeleteBooking: (id: string) => void;
}

export function BookingsTab({
  bookings,
  searchQuery,
  onUpdateStatus,
  onDeleteBooking,
}: BookingsTabProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'test-drive' | 'finance'>('all');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<BookingLead | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      // Type filter
      if (typeFilter !== 'all' && b.type !== typeFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = b.fullName.toLowerCase().includes(query);
        const matchesPhone = b.phone.toLowerCase().includes(query);
        const matchesEmail = b.email.toLowerCase().includes(query);
        const matchesCar = b.carId.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesCar) return false;
      }
      return true;
    });
  }, [bookings, statusFilter, typeFilter, searchQuery]);

  const handleExportCSV = () => {
    const headers = ['ID', 'F.I.SH', 'Telefon', 'Email', 'Model', 'Dilerlik', 'Sana', 'Holat', 'Izoh'];
    const rows = filteredBookings.map((b) => {
      const car = CARS_DATA.find((c) => c.id === b.carId);
      const dealer = DEALERSHIPS.find((d) => d.id === b.dealershipId);
      return [
        b.id,
        `"${b.fullName}"`,
        `"${b.phone}"`,
        `"${b.email}"`,
        `"${car?.name || b.carId}"`,
        `"${dealer?.name || b.dealershipId}"`,
        `"${b.preferredDate}"`,
        `"${b.status}"`,
        `"${b.notes || ''}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bmw_arizalar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Export Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#121317] border border-white/10 rounded-2xl p-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(
            [
              { id: 'all', label: 'Barchasi', count: bookings.length },
              {
                id: 'pending',
                label: 'Kutilmoqda',
                count: bookings.filter((b) => b.status === 'pending').length,
              },
              {
                id: 'confirmed',
                label: 'Tasdiqlangan',
                count: bookings.filter((b) => b.status === 'confirmed').length,
              },
              {
                id: 'completed',
                label: 'Bajarilgan',
                count: bookings.filter((b) => b.status === 'completed').length,
              },
              {
                id: 'cancelled',
                label: 'Bekor qilingan',
                count: bookings.filter((b) => b.status === 'cancelled').length,
              },
            ] as const
          ).map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Right Side: Type filter and Export button */}
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#1C69D4] cursor-pointer"
          >
            <option value="all" className="bg-[#121317]">
              Barcha Turlar
            </option>
            <option value="test-drive" className="bg-[#121317]">
              Test-Drive
            </option>
            <option value="finance" className="bg-[#121317]">
              Lizing / Kredit
            </option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            className="text-xs shrink-0"
          >
            CSV Eksport
          </Button>
        </div>
      </div>

      {/* Main Bookings Table */}
      <div className="bg-[#121317] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                <th className="py-3.5 pl-4">Mijoz (F.I.SH)</th>
                <th className="py-3.5 px-3">Tanlangan Model</th>
                <th className="py-3.5 px-3">Dilerlik & Sana</th>
                <th className="py-3.5 px-3">Turi</th>
                <th className="py-3.5 px-3">Holat</th>
                <th className="py-3.5 pr-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const car = CARS_DATA.find((c) => c.id === b.carId);
                  const dealer = DEALERSHIPS.find((d) => d.id === b.dealershipId);

                  return (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      {/* Customer Info */}
                      <td className="py-4 pl-4">
                        <div className="font-bold text-white text-sm">{b.fullName}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-neutral-400 mt-1">
                          <a
                            href={`tel:${b.phone}`}
                            className="hover:text-[#38bdf8] flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-[#1C69D4]" />
                            <span>{b.phone}</span>
                          </a>
                          {b.email && (
                            <a
                              href={`mailto:${b.email}`}
                              className="hover:text-white flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3 text-neutral-500" />
                              <span className="truncate max-w-[150px]">{b.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Car Details */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          {car?.heroImage && (
                            <div className="w-12 h-7 relative rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10">
                              <Image
                                src={car.heroImage}
                                alt={car.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-white">
                              {car?.name || b.carId}
                            </div>
                            <div className="text-[11px] text-neutral-400">
                              {car?.series} • {car?.specs.power}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Dealership & Date */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                          <Calendar className="w-3 h-3 text-[#38bdf8]" />
                          <span>{b.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                          <Building2 className="w-3 h-3 text-neutral-500" />
                          <span>{dealer?.name || b.dealershipId}</span>
                        </div>
                      </td>

                      {/* Lead Type */}
                      <td className="py-4 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            b.type === 'finance'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-[#1C69D4]/20 text-[#38bdf8] border border-[#1C69D4]/30'
                          }`}
                        >
                          {b.type === 'finance' ? 'Lizing / Kredit' : 'Test-Drive'}
                        </span>
                      </td>

                      {/* Interactive Status Selector */}
                      <td className="py-4 px-3">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            onUpdateStatus(b.id, e.target.value as BookingStatus)
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer border ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : b.status === 'completed'
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                              : b.status === 'cancelled'
                              ? 'bg-red-500/15 text-red-400 border-red-500/30'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          <option value="pending" className="bg-[#121317] text-amber-400">
                            Kutilmoqda
                          </option>
                          <option value="confirmed" className="bg-[#121317] text-emerald-400">
                            Tasdiqlandi
                          </option>
                          <option value="completed" className="bg-[#121317] text-blue-400">
                            Bajarildi
                          </option>
                          <option value="cancelled" className="bg-[#121317] text-red-400">
                            Bekor qilindi
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedLeadForDetail(b)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Batafsil ma'lumot va izoh"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`${b.fullName} arizasini o‘chirishni tasdiqlaysizmi?`)) {
                              onDeleteBooking(b.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Arizani o‘chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    Hech qanday ariza topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121317] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Ariza Tafsilotlari
              </h3>
              <button
                type="button"
                onClick={() => setSelectedLeadForDetail(null)}
                className="text-neutral-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">ID:</span>
                <span className="font-mono text-neutral-300">{selectedLeadForDetail.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Mijoz F.I.SH:</span>
                <span className="font-bold text-white">{selectedLeadForDetail.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Telefon:</span>
                <a
                  href={`tel:${selectedLeadForDetail.phone}`}
                  className="font-semibold text-[#38bdf8] hover:underline"
                >
                  {selectedLeadForDetail.phone}
                </a>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Email:</span>
                <span className="text-neutral-200">{selectedLeadForDetail.email || '—'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Model:</span>
                <span className="font-semibold text-white">
                  {CARS_DATA.find((c) => c.id === selectedLeadForDetail.carId)?.name ||
                    selectedLeadForDetail.carId}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Dilerlik filiali:</span>
                <span className="text-neutral-200">
                  {DEALERSHIPS.find((d) => d.id === selectedLeadForDetail.dealershipId)?.name ||
                    selectedLeadForDetail.dealershipId}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Sana:</span>
                <span className="text-white font-medium">
                  {selectedLeadForDetail.preferredDate}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-400">Ro‘yxatdan o‘tgan vaqt:</span>
                <span className="text-neutral-400">
                  {new Date(selectedLeadForDetail.createdAt).toLocaleString('uz-UZ')}
                </span>
              </div>

              {selectedLeadForDetail.notes && (
                <div className="pt-2">
                  <span className="text-neutral-400 block mb-1">Mijoz izohi / Rang:</span>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-neutral-200 font-mono text-[11px] leading-relaxed">
                    {selectedLeadForDetail.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedLeadForDetail(null)}
              >
                Yopish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
