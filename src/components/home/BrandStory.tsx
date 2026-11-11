'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Shield, Sparkles, Cpu, Award } from 'lucide-react';

export function BrandStory() {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#E2231A]" />,
      title: 'Motorsport Merosi (M Power)',
      description:
        '1972-yildan buyon Nyurburgring poygalarida toblangan texnologiyalar. Har bir M modeli mutlaq boshqaruvchanlik va poyga trassasi adrenalinini beradi.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#0066B1]" />,
      title: 'Kelajak Elektri (BMW i)',
      description:
        '5-avlod eDrive motorlari, ilg‘or batareya boshqaruvi va 800V tezkor quvvatlash texnologiyasi bilan nol chiqindili toza dinamika.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Bavariya Hashamati',
      description:
        'Eng nodir charm qoplamalari, Swarovski kristalli elementlar va zamonaviy Curved Display arxitekturasi bilan salon qulayligi.',
    },
    {
      icon: <Shield className="w-6 h-6 text-[#1C69D4]" />,
      title: 'Murosasiz Xavfsizlik',
      description:
        'Ilg‘or radar va sun’iy intellekt datchiklari, avtonom to‘xtash va yo‘l chiziqlarini avtomatik kuzatuvchi BMW Driving Assistant Pro.',
    },
  ];

  return (
    <section id="brand-story" className="py-24 sm:py-32 bg-[#0A0A0C] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1C69D4]/10 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066B1]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Badge variant="outline" className="mb-4">
            BMW Falsafasi & Innovatsiyalari
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Harakat San’ati va <br />
            <span className="text-[#1C69D4]">Muhandislik Mukammalligi</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed">
            BMW shunchaki transport vositasi emas. Bu 100 yildan ortiq davom etayotgan mukammallikka intilish, haydovchi bilan avtomobil o‘rtasidagi uzviy bog‘liqlik hamda har bir kilometrda rohatlanish falsafasidir.
          </p>
        </div>

        {/* Cinematic Split Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[360px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 group"
          >
            <Image
              src="/images/cars/interior.jpg"
              alt="BMW Curved Display Luxury Interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-widest text-[#38bdf8] font-semibold">
                Raqamli Salon
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                BMW Curved Display & Operating System 8.5
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2">
                Ovozli boshqaruv, sun’iy intellekt yordamchisi va intuitiv sensorli panel orqali to‘liq erkinlik.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="border-l-2 border-[#1C69D4] pl-6 space-y-2">
              <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                1916-yildan bugungacha
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                "Freude am Fahren" — Haydash zavqi
              </h3>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Bavariya aeromotorlaridan boshlangan bu yo‘l bugungi kunda jahon avtosanoatining eng nufuzli premium standartini yaratdi. Har bir dvigatel shovqini, har bir rul burilishi va amortizatorning ishlashi o‘zgacha zavq berish uchun sozlangan.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Biz kelajakni elektrlashtirish bilan birga, BMW ning poyga merosini asrab qolmoqdamiz. Yengil uglerod tolalari, qayta ishlangan ekologik materiallar va qudratli elektr kuch uzatmalari yangi davrni belgilamoqda.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xl font-black text-white">50:50</span>
                <p className="text-xs text-neutral-400 mt-1">Mukammal vazn taqsimoti</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xl font-black text-[#1C69D4]">#1</span>
                <p className="text-xs text-neutral-400 mt-1">Premium segment yetakchisi</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#121316]/80 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-2">{pillar.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
