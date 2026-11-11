'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BmwLogo } from '@/components/ui/BmwLogo';
import { Button } from '@/components/ui/Button';
import { CarCategory } from '@/types/car';
import { Menu, X, Phone, Compass, Zap, Gauge, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenTestDrive: (carId?: string) => void;
  onSelectCategory: (category: CarCategory) => void;
}

export function Navbar({ onOpenTestDrive, onSelectCategory }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (category) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand title */}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => handleNavClick('all', 'catalog')}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none focus:text-white"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              Modellar
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('bmw-i', 'catalog')}
              className="text-sm font-medium text-neutral-300 hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              <Zap className="w-4 h-4 text-[#0066B1]" />
              BMW i (Elektr)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('m-power', 'catalog')}
              className="text-sm font-medium text-neutral-300 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              <Gauge className="w-4 h-4 text-[#E2231A]" />
              M Power
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'configurator')}
              className="text-sm font-medium text-neutral-300 hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              <Sliders className="w-4 h-4 text-[#1C69D4]" />
              Konfigurator
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'finance')}
              className="text-sm font-medium text-neutral-300 hover:text-[#38bdf8] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              Kredit & Lizing
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'brand-story')}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus:text-white"
            >
              Falsafa
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(undefined, 'dealerships')}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none focus:text-white"
            >
              Dilerlar
            </button>
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenTestDrive()}
              leftIcon={<Phone className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex border-white/20 hover:border-white/40"
            >
              Test-Drive
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              className="md:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C69D4]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => handleNavClick('all', 'catalog')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-neutral-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Compass className="w-5 h-5 text-neutral-400" />
                <span className="font-medium">Barcha Modellar</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('bmw-i', 'catalog')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-[#38bdf8] hover:bg-[#0066B1]/10 transition-colors"
              >
                <Zap className="w-5 h-5 text-[#0066B1]" />
                <span className="font-medium">BMW i (Elektr Avtomobillar)</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('m-power', 'catalog')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Gauge className="w-5 h-5 text-[#E2231A]" />
                <span className="font-medium">BMW M Motorsport</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'configurator')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-[#38bdf8] hover:bg-white/5 transition-colors"
              >
                <Sliders className="w-5 h-5 text-[#1C69D4]" />
                <span className="font-medium">Konfigurator Studio</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'brand-story')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-neutral-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">BMW Falsafasi</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(undefined, 'dealerships')}
                className="flex items-center gap-3 text-left py-2.5 px-3 rounded-lg text-neutral-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">O‘zbekistondagi Dilerlar</span>
              </button>

              <div className="pt-2 border-t border-white/10">
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
