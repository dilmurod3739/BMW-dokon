'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ChevronRight,
  Gauge,
  Zap,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreModels: () => void;
  onOpenTestDrive: () => void;
}

const HERO_VIDEOS = [
  {
    id: 'highway',
    label: 'M Highway Dinamika',
    src: '/videos/bmw-hero-driving.mp4',
    badge: 'BMW M Motorsport Drive',
  },
  {
    id: 'dusk',
    label: 'M3 Shahar Harakati',
    src: '/videos/bmw-m3-dusk-driving.mp4',
    badge: 'BMW M3 Dusk Motion',
  },
];

export function HeroSection({ onExploreModels, onOpenTestDrive }: HeroSectionProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = HERO_VIDEOS[activeVideoIdx];

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
  }, [isPlaying, activeVideoIdx]);

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

  const switchVideo = (idx: number) => {
    setActiveVideoIdx(idx);
    setIsPlaying(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video with Dark Vignette and Gradient Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={currentVideo.src}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster="/images/cars/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.12] transition-opacity duration-1000"
        >
          <source src={currentVideo.src} type="video/mp4" />
          {/* Fallback image */}
          <Image
            src="/images/cars/hero.jpg"
            alt="BMW Flagship High Performance M8 Gran Coupé"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
        </video>

        {/* Ambient Dark Overlays for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0C]/40 to-[#0A0A0C] pointer-events-none" />
        
        {/* Subtle BMW Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#0066B1]/20 blur-[150px] pointer-events-none rounded-full" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <Badge variant="m-power" className="px-4 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#E2231A] animate-pulse inline-block mr-1.5" />
            Yangi Avlod Flagmanlari 2026
          </Badge>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium backdrop-blur-md bg-white/10 border border-white/15 text-neutral-200">
            <Video className="w-3 h-3 text-[#38bdf8]" />
            {currentVideo.badge}
          </span>
        </motion.div>

        {/* Big Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05]"
        >
          Sheer Driving <br />
          <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Pleasure
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-xl text-neutral-300 font-light leading-relaxed"
        >
          Bavariya muhandisligining eng yuksak cho‘qqisi: mutlaq dinamika,
          aqlli innovatsiyalar va har bir soniyada hayajon baxsh etuvchi quvvat.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={onExploreModels}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold px-8 py-4"
          >
            Modellarni ko‘rish
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onOpenTestDrive}
            className="w-full sm:w-auto font-semibold px-8 py-4 border-white/20 hover:border-white/40"
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
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 backdrop-blur-xl bg-black/60 border border-white/15 p-1.5 rounded-full shadow-2xl">
        {/* Scene switcher buttons */}
        <div className="flex items-center gap-1 pr-1 border-r border-white/10">
          {HERO_VIDEOS.map((v, idx) => (
            <button
              key={v.id}
              type="button"
              onClick={() => switchVideo(idx)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                activeVideoIdx === idx
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

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
