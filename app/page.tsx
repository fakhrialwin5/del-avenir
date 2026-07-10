'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/layout/LoadingScreen';
import HeroSection from '@/components/sections/home/HeroSection';
import AboutSection from '@/components/sections/home/AboutSection';
import VisionMissionSection from '@/components/sections/home/VisionMissionSection';
import GenerationHighlightsSection from '@/components/sections/home/GenerationHighlightsSection';
import AchievementsPreviewSection from '@/components/sections/home/AchievementsPreviewSection';
import AchievementsHorizontalScroll from '@/components/sections/home/AchievementsHorizontalScroll';
import MuhadhorohCountdownSection from '@/components/sections/home/MuhadhorohCountdownSection';
import CommunityImpactSection from '@/components/sections/home/CommunityImpactSection';
import SupportCTASection from '@/components/sections/home/SupportCTASection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if loading screen has been shown in this session
    const hasLoaded = sessionStorage.getItem('delavenir-loaded');
    
    if (hasLoaded) {
      // Already loaded in this session, skip loading screen
      setIsLoading(false);
    } else {
      // First visit in this session, show loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('delavenir-loaded', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <GenerationHighlightsSection />
        <AchievementsPreviewSection />
        <AchievementsHorizontalScroll />
        <MuhadhorohCountdownSection />
        <CommunityImpactSection />
        <SupportCTASection />
      </motion.div>
    </>
  );
}
