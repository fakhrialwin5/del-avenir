'use client';

import HeroSection from '@/components/sections/muhadhoroh/HeroSection';
import EventInfo from '@/components/sections/muhadhoroh/EventInfo';
import Schedule from '@/components/sections/muhadhoroh/Schedule';
import MomentsGallery from '@/components/sections/muhadhoroh/MomentsGallery';

export default function MuhadhorohPage() {
  return (
    <main className="min-h-screen bg-black" role="main">
      <HeroSection />
      <EventInfo />
      <Schedule />
      <MomentsGallery />
    </main>
  );
}
