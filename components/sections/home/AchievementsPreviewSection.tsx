'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useAchievements } from '@/lib/hooks/useAchievements';
import { Trophy, Medal, Award, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const categoryColors: Record<string, { bg: string; text: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }> = {
  religious: { bg: 'bg-black', text: 'text-white', icon: Trophy },
  academic: { bg: 'bg-gray-700', text: 'text-white', icon: Medal },
  arts: { bg: 'bg-gray-500', text: 'text-white', icon: Award },
  sports: { bg: 'bg-gray-400', text: 'text-white', icon: Star },
  community: { bg: 'bg-gray-200', text: 'text-black', icon: Award },
};

export default function AchievementsPreviewSection() {
  const { achievements, loading, error } = useAchievements({ limit: 6 });

  return (
    <section className="py-20 md:py-32 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Achievement Bank"
          subtitle="Celebrating Excellence, Inspiring Generations"
        />

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-black mb-4" />
              <p className="text-gray-500 font-body text-sm">Loading achievements...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400 font-body text-sm">Unable to load achievements.</p>
          </div>
        )}

        {/* Achievements grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 font-body">No achievements yet.</p>
              </div>
            )}

            {achievements.slice(0, 6).map((achievement, index) => {
              const catKey = achievement.category as keyof typeof categoryColors;
              const colors = categoryColors[catKey] || categoryColors.academic;
              const Icon = colors.icon;

              return (
                <motion.div
                  key={achievement.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.06 }}
                >
                  <SpotlightCard className="p-4 sm:p-6 h-full rounded-3xl card-premium">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${colors.bg} ${colors.text}`}
                      >
                        <Icon className="w-3 h-3" strokeWidth={2} />
                        {achievement.category}
                      </span>
                      <span className="text-sm font-display text-gray-400">
                        {achievement.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-display text-black mb-2 leading-snug">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-body leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Level badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-black/5 text-gray-600">
                        {achievement.level}
                      </span>
                      {achievement.ranking > 0 && achievement.ranking <= 3 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500">
                          <Trophy className="w-3 h-3" /> #{achievement.ranking}
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center"
        >
          <Link href="/achievement">
            <Button className="bg-black text-white hover:bg-gray-800 btn-premium px-8">
              View All Achievements
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
