'use client';

import { Search, Grid3X3, BookOpen, Palette, Trophy, Star, Heart } from 'lucide-react';
import { ACHIEVEMENT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  grid: Grid3X3,
  'book-open': BookOpen,
  palette: Palette,
  trophy: Trophy,
  star: Star,
  heart: Heart,
};

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 md:top-20 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {ACHIEVEMENT_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
                  isActive
                    ? 'bg-gold text-white shadow-gold'
                    : 'border border-gray-300 text-gray-600 hover:border-gold hover:text-gold',
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-gray-400 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>
    </div>
  );
}
