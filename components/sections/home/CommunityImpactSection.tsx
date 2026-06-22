'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Users, Trophy, Heart, GraduationCap } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stats = [
  { icon: Users, value: 1000, suffix: '+', label: 'Active Students' },
  { icon: Trophy, value: 150, suffix: '+', label: 'Achievements Won' },
  { icon: Heart, value: 50, suffix: '+', label: 'Community Programs' },
  { icon: GraduationCap, value: 10, suffix: '', label: 'Years of Excellence' },
];

export default function CommunityImpactSection() {
  return (
    <section className="py-32 md:py-40 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Our Impact"
          subtitle="Making a difference in the community through education and service"
        />

        {/* Asymmetric Stats Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Large Feature Stat */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="md:col-span-5 p-8 md:p-10 rounded-3xl bg-white border border-black/[0.04] text-center flex flex-col items-center justify-center card-premium"
          >
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="font-display text-6xl md:text-7xl text-black">
                <CountUp target={1000} />
              </span>
              <span className="font-display text-3xl text-black/40">+</span>
            </div>
            <p className="text-sm text-gray-500 font-body">Active Students</p>
          </motion.div>

          {/* Right Column - Stacked Stats */}
          <div className="md:col-span-7 grid grid-cols-2 gap-5">
            {stats.slice(1).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.08 * (index + 1) }}
                className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.04] text-center card-premium"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <stat.icon className="w-5 h-5 text-black" strokeWidth={1.5} />
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="font-display text-3xl md:text-4xl text-black">
                    <CountUp target={stat.value} />
                  </span>
                  <span className="font-display text-xl text-black/40">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-500 font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
