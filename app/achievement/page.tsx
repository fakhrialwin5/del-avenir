'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/achievement/HeroSection';
import FilterBar from '@/components/sections/achievement/FilterBar';
import AchievementGrid from '@/components/sections/achievement/AchievementGrid';

export default function AchievementPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-white" role="main">
      <HeroSection />
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <AchievementGrid
        activeCategory={activeCategory}
        searchQuery={searchQuery}
      />
    </main>
  );
}
