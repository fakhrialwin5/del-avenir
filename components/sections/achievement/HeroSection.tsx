'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import VideoBackground from '@/components/sections/home/VideoBackground';

const icons = [Trophy, Medal, Award, Star];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground videoSrc="/videos/mount-fuji-pastel-sky-wallpaperwaves-com.mp4" />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-body font-medium tracking-widest uppercase text-white border border-white/30 rounded-full bg-black/30 backdrop-blur-sm">
            <Trophy className="w-4 h-4" />
            Bank Prestasi
          </span>
        </motion.div>
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl text-white mb-6"
          style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Achievement <span className="italic text-gray-300">Bank</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 font-body max-w-2xl mx-auto mb-8"
        >
          Celebrating the remarkable achievements of Generation 11 Baitul Qur&apos;an
        </motion.p>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-8 text-white/60"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-body">Religious</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4" />
            <span className="text-sm font-body">Academic</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="text-sm font-body">Arts</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="text-sm font-body">Sports</span>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
