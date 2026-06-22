'use client';

import {
  Theater,
  Palette,
  Mic,
  BookOpen,
  Music,
  Globe,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MUHADHOROH_EVENT } from '@/lib/constants';

/* ── Icon Map ── */

const iconMap: Record<string, React.ElementType> = {
  theater: Theater,
  palette: Palette,
  mic: Mic,
  'book-open': BookOpen,
  music: Music,
  globe: Globe,
};

/* ── Stagger Animation Variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ── Component ── */

export default function EventInfo() {
  return (
    <section className="bg-black px-4 py-24" id="about">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
              What is Muhadhoroh <span className="italic text-white/60">Kubro?</span>
            </h2>
            <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
              Mengenal lebih dekat acara tahunan spektakuler santri Baitul Qur&apos;an
            </p>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          {/* Left Column — Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed text-white/80 md:text-lg font-body">
              {MUHADHOROH_EVENT.description}
            </p>
            <p className="text-base leading-relaxed text-white/60 md:text-lg font-body">
              {MUHADHOROH_EVENT.descriptionEn}
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">
                  {MUHADHOROH_EVENT.expectedAttendees.toLocaleString()}+
                </p>
                <p className="text-sm text-white/60 font-body">Expected Guests</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Performance Types Grid */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {MUHADHOROH_EVENT.performanceTypes.map((perf) => {
              const IconComponent = iconMap[perf.icon] || Theater;
              return (
                <motion.div
                  key={perf.type}
                  variants={itemVariants}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {perf.label}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-white/60 font-body">
                    {perf.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
