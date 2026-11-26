'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { BmwLogo } from '@/components/ui/BmwLogo';
import { Button } from '@/components/ui/Button';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export const ADMIN_PASSCODE = 'BMW2027';
export const AUTH_STORAGE_KEY = 'bmw_admin_auth_session';

interface AdminAuthGateProps {
  onAuthenticate: () => void;
}

export function AdminAuthGate({ onAuthenticate }: AdminAuthGateProps) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    setTimeout(() => {
      if (passcode.trim() === ADMIN_PASSCODE) {
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        } catch {}
        onAuthenticate();
      } else {
        setError(true);
        setShake(true);
        setIsSubmitting(false);
        setTimeout(() => setShake(false), 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#1C69D4]/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#0066B1]/10 blur-[180px] pointer-events-none" />

      {/* Main Auth Card */}
      <div
        className={`w-full max-w-md bg-[#121316] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Header with BMW Logo */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <BmwLogo className="w-12 h-12" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C69D4]/15 border border-[#1C69D4]/30 text-[#38bdf8] text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Xavfsiz Kirish Tizimi</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              BMW Admin Portal
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Boshqaruv tizimiga kirish uchun maxfiy kodni kiriting
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Kirish Kodi (Passcode)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Kod: BMW2027"
                autoFocus
                required
                className={`w-full pl-10 pr-12 py-3.5 bg-black/50 border rounded-xl text-white placeholder-neutral-600 text-sm tracking-widest font-mono focus:outline-none transition-all ${
                  error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                    : 'border-white/15 focus:border-[#1C69D4] focus:ring-2 focus:ring-[#1C69D4]/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label={showPasscode ? 'Kodni yashirish' : 'Kodni ko‘rsatish'}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 animate-fade-in font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Kiritilgan kod noto‘g‘ri! Iltimos, qaytadan urinib ko‘ring.</span>
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="m-power"
            size="lg"
            disabled={isSubmitting}
            leftIcon={<Lock className="w-4 h-4" />}
            className="w-full py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#1C69D4]/25"
          >
            {isSubmitting ? 'Tekshirilmoqda...' : 'Tizimga Kirish'}
          </Button>
        </form>

        {/* Footer / Back Link */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Asosiy saytga qaytish</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
