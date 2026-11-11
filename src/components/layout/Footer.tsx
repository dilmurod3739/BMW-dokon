import * as React from 'react';
import Link from 'next/link';
import { BmwLogo } from '@/components/ui/BmwLogo';
import { CarCategory } from '@/types/car';
import { Phone, Mail, MapPin, Globe, Shield, Award } from 'lucide-react';

interface FooterProps {
  onOpenTestDrive?: () => void;
  onSelectCategory?: (category: CarCategory) => void;
}

export function Footer({ onOpenTestDrive, onSelectCategory }: FooterProps) {
  const handleCategoryClick = (category: CarCategory) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const elem = document.getElementById('catalog');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-[#070709] border-t border-white/10 text-neutral-400 text-sm">
      {/* Top Banner: Brand Values */}
      <div className="border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#1C69D4]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Rasmiy 4 Yillik Kafolat</h4>
                <p className="text-xs text-neutral-500">BMW AG xalqaro kafolati va servis xizmati</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#0066B1]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Asl Ehtiyot Qismlar</h4>
                <p className="text-xs text-neutral-500">100% Bavariya zavod sifatidagi original detallar</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">BMW 24/7 Roadside Assistance</h4>
                <p className="text-xs text-neutral-500">Yo‘lda tunu-kun professional texnik yordam</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BmwLogo className="w-10 h-10" />
              <div>
                <span className="text-white font-bold tracking-widest text-lg uppercase">
                  BMW
                </span>
                <p className="text-[10px] tracking-widest uppercase text-neutral-500">
                  Sheer Driving Pleasure
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Bavariya avtomobilsozlik an’analari, ilg‘or intellektual texnologiyalar va murosasiz haydash dinamikasi. O‘zbekistondagi rasmiy vakolatxona.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-[#1C69D4]" />
                <span>+998 71 200 44 44 (Yagona aloqa markazi)</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-[#1C69D4]" />
                <span>info@bmw-uzbekistan.uz</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#1C69D4]" />
                <span>Toshkent shahri, Amir Temur shox ko‘chasi, 107B</span>
              </div>
            </div>
          </div>

          {/* Column 1: Modellar */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Modellar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('m-power')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BMW M Motorsport
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('bmw-i')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BMW i (To‘liq Elektr)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('x-series')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BMW X-Series (SAV / SAC)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('sedans')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BMW 7 va 8 Seriyalar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Barcha Modellar Katalogi
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Xizmatlar */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Mijozlar Uchun
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenTestDrive}
                  className="hover:text-white transition-colors text-left cursor-pointer text-[#38bdf8] font-medium"
                >
                  Test-Drive ga yozilish
                </button>
              </li>
              <li>
                <a href="#configurator" className="hover:text-white transition-colors">
                  BMW Individual Konfigurator
                </a>
              </li>
              <li>
                <a href="#dealerships" className="hover:text-white transition-colors">
                  Dilerlik markazlari
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  BMW Financial Services (Kredit)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  BMW Premium Selection (Trade-in)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Mijozlarni qo‘llab-quvvatlash
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Texnologiyalar */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Innovatsiyalar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-neutral-400">BMW eDrive 5-avlod</span>
              </li>
              <li>
                <span className="text-neutral-400">BMW Curved Display & OS 8.5</span>
              </li>
              <li>
                <span className="text-neutral-400">M xDrive Active Differential</span>
              </li>
              <li>
                <span className="text-neutral-400">BMW Laserlight & Iconic Glow</span>
              </li>
              <li>
                <span className="text-neutral-400">Ekologik barqarorlik (Circular)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="border-t border-white/5 py-6 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} BMW O‘zbekiston. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Maxfiylik siyosati</span>
            <span className="hover:text-neutral-400 cursor-pointer">Foydalanish shartlari</span>
            <span className="hover:text-neutral-400 cursor-pointer">Cookie sozlamalari</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
