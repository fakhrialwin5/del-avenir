'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SAMPLE_ACHIEVEMENTS } from '@/lib/constants';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const categoryColors = {
  religious: { bg: 'bg-black', text: 'text-white', icon: Trophy },
  academic: { bg: 'bg-gray-700', text: 'text-white', icon: Medal },
  arts: { bg: 'bg-gray-500', text: 'text-white', icon: Award },
  sports: { bg: 'bg-gray-400', text: 'text-white', icon: Star },
  community: { bg: 'bg-gray-200', text: 'text-black', icon: Award },
};

export default function AchievementsPreviewSection() {
  const previewAchievements = SAMPLE_ACHIEVEMENTS.slice(0, 6);

  return (
    <section className="py-32 md:py-40 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Achievement Bank"
          subtitle="Celebrating Excellence, Inspiring Generations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.06 }}
            >
              <SpotlightCard className="p-6 h-full rounded-3xl card-premium">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${
                      categoryColors[achievement.category as keyof typeof categoryColors]?.bg || 'bg-black'
                    } ${
                      categoryColors[achievement.category as keyof typeof categoryColors]?.text || 'text-white'
                    }`}
                  >
                    {(() => {
                      const Icon = categoryColors[achievement.category as keyof typeof categoryColors]?.icon || Trophy;
                      return <Icon className="w-3 h-3" strokeWidth={2} />;
                    })()}
                    {achievement.category}
                  </span>
                  <span className="text-sm font-display text-gray-400">
                    {achievement.year}
                  </span>
                </div>

                <h3 className="text-lg font-display text-black mb-2 leading-snug">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">
                  {achievement.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

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
