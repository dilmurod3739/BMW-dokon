'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { CARS_DATA } from '@/data/cars';
import { Car } from '@/types/car';
import { calculateFinance } from '@/lib/financeUtils';
import { formatPrice } from '@/lib/utils';
import { Calculator, ShieldCheck, ChevronRight, Sparkles, Percent, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FinanceCalculatorProps {
  onApplyFinance?: (car: Car, summaryNote: string) => void;
}

export function FinanceCalculator({ onApplyFinance }: FinanceCalculatorProps) {
  const [selectedCarId, setSelectedCarId] = useState<string>(CARS_DATA[0].id);
  const [financeType, setFinanceType] = useState<'leasing' | 'credit'>('leasing');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(36);

  const selectedCar = useMemo(() => {
    return CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];
  }, [selectedCarId]);

  const interestRate = financeType === 'leasing' ? 14.5 : 16.9;

  const financeResult = useMemo(() => {
    return calculateFinance({
      carPrice: selectedCar.price,
      downPaymentPercent,
      termMonths,
      annualInterestRate: interestRate,
    });
  }, [selectedCar.price, downPaymentPercent, termMonths, interestRate]);

  const handleApply = () => {
    if (onApplyFinance) {
      const note = `[BMW Financial Services] Dastur: ${
        financeType === 'leasing' ? 'Lizing' : 'Kredit'
      }, Boshlang‘ich to‘lov: ${downPaymentPercent}% (${formatPrice(
        financeResult.downPaymentAmount
      )}), Muddat: ${termMonths} oy, Kutilayotgan oylik to‘lov: ~${formatPrice(
        financeResult.monthlyPayment
      )}/oy`;
      onApplyFinance(selectedCar, note);
    }
  };

  const termOptions = [12, 24, 36, 48, 60];
  const percentPresets = [20, 30, 40, 50];

  return (
    <section
      id="finance"
      className="py-24 sm:py-32 bg-[#0A0A0C] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#1C69D4]/10 blur-[160px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0066B1]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#0066B1]" />
            <span>BMW Financial Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Kredit va <span className="text-[#38bdf8]">Lizing</span> Kalkulyatori
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Orzuingizdagi BMW avtomobiliga ega bo‘lish uchun qulay oylik to‘lov va boshlang‘ich to‘lov parametrlarini o‘zingiz rejalashtiring.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
            {/* 1. Model Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                1. Avtomobil modelini tanlang
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CARS_DATA.map((car) => {
                  const isSelected = car.id === selectedCar.id;
                  return (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setSelectedCarId(car.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        isSelected
                          ? 'bg-[#1C69D4]/15 border-[#1C69D4] text-white shadow-[0_0_15px_rgba(28,105,212,0.3)]'
                          : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span className="text-[11px] font-bold line-clamp-1">
                        {car.series}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {formatPrice(car.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Financing Program Switcher */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                2. Moliyalashtirish turi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFinanceType('leasing')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    financeType === 'leasing'
                      ? 'bg-white/10 border-white text-white shadow-lg'
                      : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">BMW Select Lizing</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#1C69D4] text-white font-semibold">
                      14.5% yillik
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Yuridik va jismoniy shaxslar uchun soliq imtiyozlari bilan
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFinanceType('credit')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    financeType === 'credit'
                      ? 'bg-white/10 border-white text-white shadow-lg'
                      : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Avtokredit</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                      16.9% yillik
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    To‘g‘ridan-to‘g‘ri mulk huquqini rasmiylashtirish
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Down Payment Slider & Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  3. Boshlang‘ich to‘lov ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-white">
                  {formatPrice(financeResult.downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#1C69D4]"
              />
              <div className="flex gap-2 mt-3">
                {percentPresets.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      downPaymentPercent === pct
                        ? 'bg-[#1C69D4] text-white font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Loan Term */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                4. To‘lov muddati
              </label>
              <div className="grid grid-cols-5 gap-2">
                {termOptions.map((months) => {
                  const isSelected = termMonths === months;
                  return (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setTermMonths(months)}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {months} oy
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Summary & Application Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#16181F] to-[#0E0F12] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Car Preview */}
            <div>
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-6">
                <Image
                  src={selectedCar.heroImage}
                  alt={selectedCar.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                    {selectedCar.category.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-white truncate">
                    {selectedCar.name}
                  </h3>
                </div>
              </div>

              {/* Big Monthly Output */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-center">
                <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                  Kutilayotgan oylik to‘lov
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                  {formatPrice(financeResult.monthlyPayment)}
                  <span className="text-sm font-normal text-neutral-400">/oy</span>
                </div>
                <span className="inline-block text-[11px] text-emerald-400 mt-1 font-medium">
                  {interestRate}% yillik stavka asosida
                </span>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm text-neutral-300 border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Avtomobil rasmiy narxi:</span>
                  <span className="font-semibold text-white">
                    {formatPrice(selectedCar.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Boshlang‘ich to‘lov ({downPaymentPercent}%):</span>
                  <span className="font-semibold text-white">
                    {formatPrice(financeResult.downPaymentAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Moliyalashtiriladigan summa:</span>
                  <span className="font-semibold text-white">
                    {formatPrice(financeResult.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Hisoblangan jami foiz:</span>
                  <span className="font-semibold text-neutral-300">
                    {formatPrice(financeResult.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-white font-bold">
                  <span>Jami to‘lov miqdori:</span>
                  <span className="text-[#38bdf8]">
                    {formatPrice(financeResult.totalPayment)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
              >
                <span>Lizing uchun ariza qoldirish</span>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <p className="text-[10px] text-center text-neutral-500 leading-tight">
                * Hisob-kitoblar namunaviy bo‘lib, yakuniy shartlar bank va lizing kompaniyasi kredit qo‘mitasi tomonidan tasdiqlanadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
