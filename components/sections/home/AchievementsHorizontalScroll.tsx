'use client';

import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';
import { useAchievements } from '@/lib/hooks/useAchievements';

const categoryColors: Record<string, { bg: string; text: string }> = {
  religious: { bg: 'bg-black', text: 'text-white' },
  academic: { bg: 'bg-gray-700', text: 'text-white' },
  arts: { bg: 'bg-gray-500', text: 'text-white' },
  sports: { bg: 'bg-gray-400', text: 'text-white' },
  community: { bg: 'bg-gray-200', text: 'text-black' },
};

export default function AchievementsHorizontalScroll() {
  const { achievements, loading, error } = useAchievements({ limit: 6 });

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center min-h-[300px]">
          <p className="text-gray-400 font-body text-sm">Loading achievements...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center min-h-[200px]">
          <p className="text-gray-400 font-body text-sm">Unable to load achievements.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 font-body">No achievements yet.</p>
            </div>
          )}

          {achievements.slice(0, 6).map((achievement, index) => {
            const catKey = achievement.category as keyof typeof categoryColors;
            const colors = categoryColors[catKey] || categoryColors.academic;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-3xl bg-white border border-black/[0.04] p-6 card-premium"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${colors.bg} ${colors.text}`}>
                    {achievement.category}
                  </span>
                  <span className="text-sm font-display text-gray-400">
                    {achievement.year}
                  </span>
                </div>

                <h3 className="text-lg font-display text-black mb-2 leading-snug">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed mb-4">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-body capitalize">
                      {achievement.level}
                    </span>
                  </div>
                  {achievement.ranking > 0 && achievement.ranking <= 3 && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-black">
                      <Medal className="w-3.5 h-3.5" />
                      #{achievement.ranking}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
