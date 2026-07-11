'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import VideoBackground from '@/components/sections/home/VideoBackground';

const targetDate = new Date('2026-08-23T19:15:00+07:00').getTime();

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
        <span className="font-display text-3xl sm:text-4xl text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs text-white/60 font-body uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground videoSrc="/videos/green-fields-and-peaks.960x540.mp4" priority={true} />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-body font-medium tracking-widest uppercase text-white border border-white/30 rounded-full bg-black/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            Annual Event
          </span>
        </motion.div>
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-7xl md:text-8xl text-white mb-6"
          style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Muhadhoroh <span className="italic text-gray-300">Kubro</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 font-body max-w-2xl mx-auto mb-12"
        >
          Spectacular annual showcase of student performances, arts, and multilingual creativity
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          <TimeBlock value={days} label="Days" />
          <span className="text-2xl text-white/40 font-light mt-[-20px]">:</span>
          <TimeBlock value={hours} label="Hours" />
          <span className="text-2xl text-white/40 font-light mt-[-20px]">:</span>
          <TimeBlock value={minutes} label="Minutes" />
          <span className="text-2xl text-white/40 font-light mt-[-20px]">:</span>
          <TimeBlock value={seconds} label="Seconds" />
        </motion.div>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/60 mb-12"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-body">August 23, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-body">19:15 - 22:30</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-body"></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-body">800+ Participants</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <button className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-transform duration-200 hover:scale-103">
            Learn More
          </button>
          <button className="inline-flex items-center rounded-full bg-black/30 backdrop-blur-sm px-8 py-4 text-base font-medium text-white border border-white/20 transition-transform duration-200 hover:scale-103">
            Register Now
          </button>
        </motion.div>
      </div>

    </section>
  );
}
