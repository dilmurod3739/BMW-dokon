'use client';

import * as React from 'react';
import { useState } from 'react';
import { CARS_DATA, DEALERSHIPS } from '@/data/cars';
import { BookingLead } from '@/types/admin';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { X, Plus, Calendar, Phone, Mail, User } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (
    lead: Omit<BookingLead, 'id' | 'createdAt' | 'status'> & { status?: BookingLead['status'] }
  ) => void;
}

export function NewBookingModal({
  isOpen,
  onClose,
  onAddBooking,
}: NewBookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [carId, setCarId] = useState(CARS_DATA[0]?.id || '');
  const [dealershipId, setDealershipId] = useState(DEALERSHIPS[0]?.id || '');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<BookingLead['status']>('confirmed');
  const [type, setType] = useState<BookingLead['type']>('test-drive');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Iltimos, mijoz ismi va telefon raqamini kiriting');
      return;
    }

    onAddBooking({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      carId,
      dealershipId,
      preferredDate,
      notes: notes.trim(),
      status,
      type,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121317] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C69D4]" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Yangi Ariza Qo‘shish
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
              Mijoz F.I.SH *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masalan: Sardor Komilov"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4]"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Telefon Raqami *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4]"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Email (ixtiyoriy)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mijoz@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4]"
              />
            </div>
          </div>

          {/* Model & Dealership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                BMW Modeli
              </label>
              <select
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#1C69D4]"
              >
                {CARS_DATA.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#121317]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Dilerlik Markazi
              </label>
              <select
                value={dealershipId}
                onChange={(e) => setDealershipId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#1C69D4]"
              >
                {DEALERSHIPS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#121317]">
                    {d.name} ({d.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Belgilangan Sana
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#1C69D4]"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
                Ariza Turi
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#1C69D4]"
              >
                <option value="test-drive" className="bg-[#121317]">
                  Test-Drive
                </option>
                <option value="finance" className="bg-[#121317]">
                  Lizing / Kredit
                </option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider text-[11px]">
              Menejer Izohi / Tanlangan parametrlar
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Qo‘shimcha talablar, rang yoki to‘lov shartlari..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#1C69D4]"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Bekor Qilish
            </Button>
            <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="w-4 h-4" />}>
              Arizani Saqlash
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
