'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Calendar, MapPin, Users, Music, Languages, Palette } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const eventDetails = [
  { icon: Calendar, label: 'Date', value: 'August 15, 2026' },
  { icon: MapPin, label: 'Venue', value: "Del'Avenir" },
  { icon: Users, label: 'Participants', value: '1000+ Attendees' },
];

const performances = [
  {
    icon: Music,
    title: 'Musical Performances',
    description: 'Traditional and modern Islamic music performances',
  },
  {
    icon: Languages,
    title: 'Multilingual Presentations',
    description: 'Speeches and presentations in Arabic and English',
  },
  {
    icon: Palette,
    title: 'Artistic Showcases',
    description: 'Calligraphy, drama, and visual arts exhibitions',
  },
];

export default function MuhadhorohCountdownSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Muhadhoroh Kubro"
          subtitle="Annual spectacular showcase of student performances"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Event Info - Left larger column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="lg:col-span-3"
          >
            <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-black/10 via-black/5 to-transparent h-full">
              <Card className="p-8 md:p-10 bg-black text-white h-full rounded-[calc(1.5rem-1px)]">
                <h3 className="text-2xl font-display mb-7">Event Details</h3>

                <div className="space-y-4 mb-8">
                  {eventDetails.map((detail) => (
                    <div key={detail.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center border border-white/[0.06]">
                        <detail.icon className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 font-body uppercase tracking-[0.15em]">
                          {detail.label}
                        </p>
                        <p className="text-sm font-body text-white/90">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider-elegant-white mb-8" />

                <p className="text-white/60 font-body leading-relaxed mb-8 text-[15px]">
                  Muhadhoroh Kubro merupakan acara tahunan santri yang menampilkan
                  berbagai pertunjukan yang spektakuler, yang meliputi beberapa
                  penampilan seni, yang dibungkus dengan multibahasa (Arab &amp; Inggris)
                  dan kreativitas santri.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/muhadhoroh">
                    <Button className="bg-white text-black hover:bg-gray-100 btn-premium">
                      Learn More
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button className="bg-white/10 text-white border border-white/15 hover:bg-white/15 btn-premium">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Performances - Right column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <h3 className="text-lg font-display text-black mb-2 px-1">Featured Performances</h3>

            {performances.map((performance, index) => (
              <motion.div
                key={performance.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.1 + index * 0.08 }}
              >
                <Card className="p-5 bg-gray-50/80 border border-black/[0.04] rounded-2xl card-premium">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                      <performance.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-display text-black mb-1">
                        {performance.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-body">
                        {performance.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
