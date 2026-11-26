'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  ChevronRight,
  Gauge,
  Zap,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreModels: () => void;
  onOpenTestDrive: () => void;
}

const HERO_VIDEO_SRC = '/videos/bmw-welcome-light.mp4';

export function HeroSection({ onExploreModels, onOpenTestDrive }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback: mute and retry
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video with Subtle Vignette (bright & vivid car view) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={HERO_VIDEO_SRC}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster="/images/common/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.08] transition-opacity duration-1000"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
          {/* Fallback image */}
          <Image
            src="/images/common/hero.jpg"
            alt="BMW Flagship High Performance M8 Gran Coupé"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.7] contrast-[1.08]"
          />
        </video>

        {/* Subtle Bottom & Top Gradient for Smooth Blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0A0A0C]/50 pointer-events-none" />
      </div>

      {/* Main Hero Content (Clean & Focused on the Driving Car Video) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-end min-h-[85vh] pb-8">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={onExploreModels}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold px-8 py-4 shadow-xl shadow-black/50"
          >
            Modellarni ko‘rish
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onOpenTestDrive}
            className="w-full sm:w-auto font-semibold px-8 py-4 backdrop-blur-md bg-black/40 border-white/20 hover:border-white/40 shadow-xl"
          >
            Test-Drive ga yozilish
          </Button>
        </motion.div>

        {/* Quick Performance Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-white/10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              3.2 <span className="text-sm font-normal text-neutral-400">sek</span>
            </span>
            <span className="text-xs text-neutral-400 tracking-wider uppercase mt-1 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#E2231A]" />
              0-100 km/soat (M8)
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              625 <span className="text-sm font-normal text-neutral-400">o.k.</span>
            </span>
            <span className="text-xs text-neutral-400 tracking-wider uppercase mt-1">
              M TwinPower Quvvat
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#38bdf8] tracking-tight">
              625 <span className="text-sm font-normal text-neutral-400">km</span>
            </span>
            <span className="text-xs text-neutral-400 tracking-wider uppercase mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#0066B1]" />
              Elektr Masofa (i7)
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              100%
            </span>
            <span className="text-xs text-neutral-400 tracking-wider uppercase mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1C69D4]" />
              Rasmiy Kafolat
            </span>
          </div>
        </motion.div>
      </div>

      {/* FLOATING VIDEO CONTROLS (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-1.5 backdrop-blur-xl bg-black/60 border border-white/15 p-1.5 rounded-full shadow-2xl">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Videoni to‘xtatish' : 'Videoni davom ettirish'}
          className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isPlaying ? 'Pauza' : 'Ijro etish'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
          className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" />}
        </button>
      </div>

      {/* Down indicator scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <button
          type="button"
          onClick={onExploreModels}
          aria-label="Pastga tushish"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <div className="w-5 h-8 rounded-full border-2 border-neutral-500 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
