'use client';

import { motion } from 'framer-motion';
import { Eye, Target, Heart } from 'lucide-react';
import BounceCards from '@/components/ui/BounceCards';
import { SectionHeading } from '@/components/ui/SectionHeading';

const coreValues = [
  { arabic: 'Ihsan', english: 'Excellence' },
  { arabic: 'Amanah', english: 'Integrity' },
  { arabic: 'Ilmu', english: 'Knowledge' },
  { arabic: 'Khidmah', english: 'Service' },
  { arabic: 'Ukhuwah', english: 'Unity' },
];

export default function VisionMissionSection() {
  return (
    <section className="py-32 md:py-40 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Vision & Mission"
          subtitle="The guiding principles that drive Generation 11 Baitul Qur'an"
        />

        <BounceCards staggerDelay={0.12}>
          {/* Vision */}
          <motion.div
            className="group p-8 md:p-10 h-full bg-white rounded-3xl border border-black/[0.04] card-premium"
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-7">
              <Eye className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display text-black mb-4">Our Vision</h3>
            <p className="text-gray-500 font-body leading-relaxed text-[15px]">
              Achieving the dream of achieving success. Carving the era, painting the future.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="group p-8 md:p-10 h-full bg-white rounded-3xl border border-black/[0.04] card-premium"
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-7">
              <Target className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display text-black mb-5">Our Mission</h3>
            <ol className="space-y-4 text-gray-500 font-body text-[15px]">
              <li className="flex gap-3">
                <span className="font-display text-black/80 text-sm mt-0.5">1</span>
                <span>Leaving a golden footprint on the horizon of Baitul Qur&apos;an with unforgettable achievements.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-black/80 text-sm mt-0.5">2</span>
                <span>Coloring the generation with the hue of glory based on Islamic values.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-black/80 text-sm mt-0.5">3</span>
                <span>Notching 100 achievements for the alma mater of Baitul Qur&apos;an.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display text-black/80 text-sm mt-0.5">4</span>
                <span>Carving a legacy of the three years spent at Baitul Qur&apos;an.</span>
              </li>
            </ol>
          </motion.div>

          {/* Core Values - No em-dashes */}
          <motion.div
            className="group p-8 md:p-10 h-full bg-white rounded-3xl border border-black/[0.04] card-premium"
          >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-7">
              <Heart className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-display text-black mb-5">Core Values</h3>
            <ul className="space-y-4 text-[15px]">
              {coreValues.map((v) => (
                <li key={v.arabic} className="flex items-baseline gap-3">
                  <span className="font-display text-black">{v.arabic}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 font-body">{v.english}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </BounceCards>
      </div>
    </section>
  );
}
