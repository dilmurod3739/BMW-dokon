import * as React from 'react';
import { CarSpecs } from '@/types/car';
import { Gauge, Zap, Flame, Shield, Cog, Activity } from 'lucide-react';

export function SpecsGrid({ specs }: { specs: CarSpecs }) {
  const items = [
    {
      label: 'Tezlanish (0-100)',
      value: specs.acceleration,
      icon: <Gauge className="w-4 h-4 text-[#E2231A]" />,
    },
    {
      label: 'Ot Kuchi',
      value: specs.power,
      icon: <Flame className="w-4 h-4 text-amber-400" />,
    },
    {
      label: 'Maksimal Tezlik',
      value: specs.topSpeed,
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
    },
    {
      label: 'Aylanish Momenti',
      value: specs.torque,
      icon: <Zap className="w-4 h-4 text-[#0066B1]" />,
    },
    {
      label: 'Uzatma Turi',
      value: specs.drivetrain,
      icon: <Shield className="w-4 h-4 text-sky-400" />,
    },
    {
      label: 'Uzatmalar Qutisi',
      value: specs.transmission,
      icon: <Cog className="w-4 h-4 text-neutral-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between"
        >
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            {item.icon}
            <span className="truncate">{item.label}</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-white mt-1">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
