'use client';

import { BookOpen, Calendar, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const supportReasons = [
  {
    icon: BookOpen,
    title: 'Education',
    description:
      'Your support funds scholarships, educational materials, and quality learning programs for our students to excel in both Islamic and academic studies.',
  },
  {
    icon: Calendar,
    title: 'Events',
    description:
      'Contributions help us organize impactful events including Muhadhoroh Kubro, competitions, and community programs that showcase student talents.',
  },
  {
    icon: Building2,
    title: 'Facilities',
    description:
      'Donations go toward improving pesantren facilities, creating a comfortable and conducive environment for learning and living.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhySupportSection() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            Why Support <span className="italic text-white/60">Us?</span>
          </h2>
          <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
            Your contribution makes a meaningful difference in every aspect of our mission
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {supportReasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                {/* Icon Circle */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-white/60 font-body leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
