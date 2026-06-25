'use client';

import { motion } from 'framer-motion';
import { Heart, HeartHandshake, HandHeart } from 'lucide-react';
import VideoBackground from '@/components/sections/home/VideoBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground videoSrc="/videos/mount-fuji-pastel-sky-wallpaperwaves-com.mp4" priority={true} />
      
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
            <HeartHandshake className="w-4 h-4" />
            Support Us
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
          Support the <span className="italic text-gray-300">Future</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 font-body max-w-2xl mx-auto mb-12"
        >
          Help us empower the next generation of Islamic leaders through education, 
          arts, and community service
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-transform duration-200 hover:scale-103">
            <Heart className="w-4 h-4" />
            Donate Now
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-8 py-4 text-base font-medium text-white border border-white/20 transition-transform duration-200 hover:scale-103">
            <HandHeart className="w-4 h-4" />
            Become a Sponsor
          </button>
        </motion.div>
      </div>

    </section>
  );
}
