'use client';

import { useMemo } from 'react';
import { Trophy, SearchX, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useAchievements } from '@/lib/hooks/useAchievements';
import {
  ACHIEVEMENT_LEVELS,
  ACHIEVEMENT_CATEGORIES,
} from '@/lib/constants';

const badgeColorMap: Record<string, 'gold' | 'gray' | 'amber' | 'green'> = {
  gold: 'gold',
  silver: 'gray',
  bronze: 'amber',
  gray: 'gray',
};

const categoryLabelMap: Record<string, string> = Object.fromEntries(
  ACHIEVEMENT_CATEGORIES.filter((c) => c.id !== 'all').map((c) => [
    c.id,
    c.label,
  ]),
);

interface AchievementGridProps {
  activeCategory: string;
  searchQuery: string;
}

export default function AchievementGrid({
  activeCategory,
  searchQuery,
}: AchievementGridProps) {
  const { achievements, loading, error } = useAchievements({
    category: activeCategory,
    search: searchQuery,
  });

  // Loading state
  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold mb-4" />
          <p className="text-gray-500 font-body">Loading achievements...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 font-body">
            Failed to load achievements. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  // Empty state
  if (achievements.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SearchX className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="font-display text-xl font-bold text-gray-700 mb-2">
            No Achievements Found
          </h3>
          <p className="text-gray-500 font-body">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        <p className="mb-8 text-sm text-gray-500 font-body">
          Showing{' '}
          <span className="font-medium text-foreground">{achievements.length}</span>{' '}
          {achievements.length === 1 ? 'achievement' : 'achievements'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const levelInfo =
              ACHIEVEMENT_LEVELS[
                achievement.level as keyof typeof ACHIEVEMENT_LEVELS
              ];

            return (
              <ScrollReveal
                key={achievement.id}
                variant="fadeUp"
                delay={0.08 * index}
              >
                <div
                  id={achievement.id}
                  className="group relative h-full rounded-card bg-white border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-gold/50"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      color={
                        categoryLabelMap[achievement.category] === 'Religious'
                          ? 'green'
                          : 'gold'
                      }
                    >
                      {categoryLabelMap[achievement.category] ||
                        achievement.category}
                    </Badge>
                    {levelInfo && (
                      <Badge
                        color={badgeColorMap[levelInfo.color] || 'gray'}
                      >
                        {levelInfo.label}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-tight">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-body">
                    {achievement.description}
                  </p>

                  {/* Year & Ranking */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="font-medium text-foreground">
                      {achievement.year}
                    </span>
                    {achievement.ranking > 0 && (
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-gold" />
                        <span className="font-medium text-gold-dark">
                          #{achievement.ranking}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Students */}
                  {achievement.students.length > 0 && (
                    <p className="mt-3 text-xs text-gray-400 font-body">
                      {achievement.students.join(', ')}
                    </p>
                  )}

                  {/* Gold glow on hover (decorative bottom accent) */}
                  <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-card bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
