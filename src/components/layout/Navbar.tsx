'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BmwLogo } from '@/components/ui/BmwLogo';
import { Button } from '@/components/ui/Button';
import { CarCategory } from '@/types/car';
import { MegaMenu } from './MegaMenu';
import {
  Menu,
  X,
  Phone,
  Sliders,
  Scale,
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenTestDrive: (carId?: string) => void;
  onSelectCategory: (category: CarCategory) => void;
  onSelectCar?: (carId: string) => void;
  favoriteCount?: number;
  onOpenGarage?: () => void;
  onOpenCompare?: () => void;
}

export function Navbar({
  onOpenTestDrive,
  onSelectCategory,
  onSelectCar,
  favoriteCount = 0,
  onOpenGarage,
  onOpenCompare,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category?: CarCategory, targetId: string = 'catalog') => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCarFromMenu = (carId: string) => {
    setMegaMenuOpen(false);
    if (onSelectCar) {
      onSelectCar(carId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || megaMenuOpen
            ? 'bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C69D4] rounded-lg"
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <BmwLogo className="w-10 h-10 sm:w-11 sm:h-11" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold tracking-widest text-lg sm:text-xl leading-none uppercase">
                  BMW
                </span>
                <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-light">
                  O‘zbekiston
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (styled to mirror bmwusa.com) */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Mega-menu trigger for "Modellar" */}
              <button
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none py-1.5 px-2 rounded-lg ${
                  megaMenuOpen
                    ? 'text-[#38bdf8] bg-white/5'
                    : 'text-neutral-200 hover:text-white'
                }`}
                aria-expanded={megaMenuOpen}
              >
                <span>Modellar</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    megaMenuOpen ? 'rotate-180 text-[#38bdf8]' : 'text-neutral-400'
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'interior')}
                className="text-sm font-medium text-neutral-300 hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                Salon va Qulaylik
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'configurator')}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                O‘zingiznikini yarating
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'finance')}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                Xarid qilish
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('bmw-i', 'catalog')}
                className="text-sm font-medium text-neutral-300 hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                Elektr
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'brand-story')}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                Biz haqimizda
              </button>
            </nav>
          </div>

          {/* Right: Dealer / Search / Tools / Test-Drive */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dealer Link */}
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'dealerships')}
              className="hidden xl:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#1C69D4]" />
              <span>Mahalliy BMW markazini tanlang</span>
            </button>

            {/* Solishtirish (Compare) */}
            {onOpenCompare && (
              <button
                type="button"
                onClick={onOpenCompare}
                className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Modellarni taqqoslash"
                aria-label="Modellarni taqqoslash"
              >
                <Scale className="w-4 h-4 text-neutral-300" />
              </button>
            )}

            {/* Quick Catalog Search trigger */}
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'catalog')}
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Avtomobillarni qidirish"
              aria-label="Avtomobillarni qidirish"
            >
              <Search className="w-4 h-4 text-neutral-300" />
            </button>

            {/* Test Drive CTA */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenTestDrive()}
              leftIcon={<Phone className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex border-white/20 hover:border-white/40"
            >
              Test-Drive
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                setMegaMenuOpen(false);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C69D4]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Official BMW USA Mega-Menu Dropdown */}
      <MegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        onSelectCar={handleSelectCarFromMenu}
        onSelectCategory={onSelectCategory}
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#0A0A0C]/98 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMegaMenuOpen(true);
                }}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-white bg-white/5 font-semibold text-left"
              >
                <span>BMW Barcha Modellari (Katalog)</span>
                <ChevronDown className="w-4 h-4 text-[#38bdf8]" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('all', 'catalog')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>Barcha Modellar</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('x-series', 'catalog')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>SUVlar (X Seriyasi)</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('bmw-i', 'catalog')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-[#38bdf8] hover:bg-[#0066B1]/10 transition-colors"
              >
                <span>BMW i (To‘liq Elektr)</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('m-power', 'catalog')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span>BMW M High-Performance</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'interior')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-[#38bdf8] hover:bg-[#0066B1]/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <span>BMW Salon va Qulayliklari</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'configurator')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Sliders className="w-4 h-4 text-[#1C69D4]" />
                <span>O‘zingiznikini yarating (Konfigurator)</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'finance')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>Kredit va Lizing Kalkulyatori</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'dealerships')}
                className="flex items-center gap-3 text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#1C69D4]" />
                <span>O‘zbekistondagi Rasmiy Dilerlar</span>
              </button>

              <div className="pt-2 border-t border-white/10 mt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTestDrive();
                  }}
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  Test-Drive ga yozilish
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
