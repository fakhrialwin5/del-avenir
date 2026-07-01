'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Palette, BookOpen, Award, Calendar } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function GenerationHighlightsSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Carving the era, painting the future"
          subtitle="Generation 11 Baitul Qur'an highlights and targets"
        />

        {/* Asymmetric Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Large Feature Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="md:col-span-7 p-8 md:p-10 rounded-3xl bg-black text-white overflow-hidden relative group card-premium"
          >
            <div className="relative z-10">
              <Award className="w-8 h-8 text-white/40 mb-6" strokeWidth={1.5} />
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="font-display text-6xl md:text-7xl">
                  <CountUp target={100} />
                </span>
                <span className="font-display text-3xl md:text-4xl text-white/60">+</span>
              </div>
              <h3 className="text-xl font-display mb-2">Achievement Goals</h3>
              <p className="text-white/50 font-body text-[15px]">
                Target prestasi yang ingin diraih oleh Generasi 11
              </p>
            </div>
            {/* Subtle gradient accent */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/[0.03] rounded-full blur-3xl" />
          </motion.div>

          {/* Right Column Stack */}
          <div className="md:col-span-5 grid grid-rows-2 gap-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.08 }}
              className="p-7 rounded-3xl bg-gray-50/80 border border-black/[0.04] card-premium"
            >
              <Palette className="w-6 h-6 text-gray-400 mb-4" strokeWidth={1.5} />
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-display text-4xl text-black">
                  <CountUp target={25} />
                </span>
                <span className="font-display text-xl text-black/40">+</span>
              </div>
              <h3 className="text-base font-display text-black mb-1">Artistic Works</h3>
              <p className="text-gray-500 font-body text-sm">Karya seni yang akan diproduksi oleh santri</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.12 }}
                className="p-6 rounded-3xl bg-gray-50/80 border border-black/[0.04] card-premium"
              >
                <BookOpen className="w-5 h-5 text-gray-400 mb-3" strokeWidth={1.5} />
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-3xl text-black">
                    <CountUp target={50} />
                  </span>
                  <span className="font-display text-lg text-black/40">+</span>
                </div>
                <h3 className="text-sm font-display text-black mb-0.5">Academic</h3>
                <p className="text-gray-400 font-body text-xs">Prestasi akademik santri</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.16 }}
                className="p-6 rounded-3xl bg-gray-50/80 border border-black/[0.04] card-premium"
              >
                <Calendar className="w-5 h-5 text-gray-400 mb-3" strokeWidth={1.5} />
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-3xl text-black">
                    <CountUp target={3} />
                  </span>
                </div>
                <h3 className="text-sm font-display text-black mb-0.5">Years</h3>
                <p className="text-gray-400 font-body text-xs">Tahun perjalanan</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
