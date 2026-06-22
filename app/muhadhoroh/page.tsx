'use client';

import HeroSection from '@/components/sections/muhadhoroh/HeroSection';
import EventInfo from '@/components/sections/muhadhoroh/EventInfo';
import MomentsGallery from '@/components/sections/muhadhoroh/MomentsGallery';

export default function MuhadhorohPage() {
  return (
    <main className="min-h-screen bg-black" role="main">
      <HeroSection />
      <EventInfo />
      <MomentsGallery />
    </main>
  );
}
