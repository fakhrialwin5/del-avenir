'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Calendar, Users, BookOpen, MapPin } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stats = [
  { label: 'ESTABLISHED', value: '2015', icon: Calendar },
  { label: 'STUDENTS', value: '1000+', icon: Users },
  { label: 'PROGRAMS', value: 'Tahfidz, Academic, Arts', icon: BookOpen },
  { label: 'LOCATION', value: 'Sragen, Central Java', icon: MapPin },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Del'Avenir"
          subtitle="Nurturing Future Leaders Through Islamic Excellence"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: PBQ Card - Double-Bezel Architecture */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-black/10 via-black/5 to-transparent">
              <div className="relative bg-black text-white rounded-[calc(1.5rem-1px)] p-10 md:p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-white/[0.08] rounded-2xl flex items-center justify-center border border-white/[0.06]">
                      <span className="text-xl font-display">بِق</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-display">Baitul Qur&apos;an</h3>
                      <p className="text-white/50 font-body text-sm">Islamic Boarding School</p>
                    </div>
                  </div>

                  <div className="divider-elegant-white mb-8" />

                  <p className="text-white/70 font-body leading-relaxed mb-6 text-[15px]">
                    Pesantren Baitul Qur&apos;an Sragen is a leading Islamic boarding school in
                    Central Java, dedicated to nurturing students who excel in both religious
                    knowledge and modern education.
                  </p>

                  <p className="text-white/70 font-body leading-relaxed text-[15px]">
                    Since its establishment, the pesantren has been committed to producing
                    a generation of leaders grounded in Quranic values while embracing
                    academic excellence and artistic creativity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats + Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-10"
          >
            <p className="text-gray-500 font-body leading-relaxed text-[15px]">
              Through its comprehensive Tahfidz program, rigorous academic curriculum,
              and diverse arts programs, Pesantren Baitul Qur&apos;an provides a holistic
              educational experience that shapes well-rounded individuals ready to contribute
              to society.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group p-5 rounded-2xl bg-gray-50/80 border border-black/[0.04] card-premium"
                >
                  <stat.icon className="w-4 h-4 text-gray-400 mb-3" strokeWidth={1.5} />
                  <p className="text-[10px] font-body text-gray-400 uppercase tracking-[0.15em] mb-1">
                    {stat.label}
                  </p>
                  <p className="text-lg font-display text-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
