'use client';

import { motion } from 'framer-motion';
import { MUHADHOROH_EVENT } from '@/lib/constants';

/* ── Stagger Variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const eventVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ── Component ── */

export default function Schedule() {
  return (
    <section className="bg-gray-900 px-4 py-24" id="schedule">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            Event <span className="italic text-white/60">Schedule</span>
          </h2>
          <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
            Dua hari penuh dengan pertunjukan dan kompetisi spektakuler
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {MUHADHOROH_EVENT.schedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
            >
              {/* Day Card */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                {/* Day Header */}
                <div className="bg-white px-6 py-4 md:px-8">
                  <span className="inline-block rounded-full bg-black/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-black/60">
                    Day {day.day}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-black md:text-2xl">
                    {day.label}
                  </h3>
                  <p className="mt-1 text-sm text-black/60">{day.date}</p>
                </div>

                {/* Timeline Events */}
                <motion.div
                  className="relative px-6 pb-6 pt-8 md:px-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Vertical Line */}
                  <div className="absolute left-[1.625rem] top-10 bottom-6 w-0.5 bg-gradient-to-b from-white/40 via-white/20 to-transparent md:left-[2.125rem]" />

                  {day.events.map((event, idx) => (
                    <motion.div
                      key={idx}
                      variants={eventVariants}
                      className="relative mb-8 flex items-start gap-5 last:mb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white bg-black shadow-sm md:h-7 md:w-7">
                        <span className="h-2 w-2 rounded-full bg-white md:h-2.5 md:w-2.5" />
                      </div>

                      {/* Event Content */}
                      <div className="min-w-0 flex-1">
                        {/* Time Badge */}
                        <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                          {event.time}
                        </span>
                        <h4 className="mt-1.5 font-display text-base font-semibold text-white md:text-lg">
                          {event.title}
                        </h4>
                        <p className="mt-0.5 text-sm text-white/60 font-body">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
