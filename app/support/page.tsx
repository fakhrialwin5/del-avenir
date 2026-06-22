'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/support/HeroSection';
import WhySupportSection from '@/components/sections/support/WhySupportSection';
import DonationSection from '@/components/sections/support/DonationSection';
import ContactSection from '@/components/sections/support/ContactSection';

export default function SupportPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
      role="main"
    >
      <HeroSection />
      <WhySupportSection />
      <DonationSection />
      <ContactSection />
    </motion.main>
  );
}
