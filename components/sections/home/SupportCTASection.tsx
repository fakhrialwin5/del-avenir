'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heart, HandHeart, CreditCard, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import Link from 'next/link';
import LiquidGlass from '@/components/ui/LiquidGlass';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function SupportCTASection() {
  return (
    <section id="support" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2
              className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-black mb-5 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Support the Future{' '}
              <span className="italic text-gray-400">Generation</span>
            </h2>
            <div className="mx-auto h-px w-12 bg-black/15 mb-5" />
            <p className="text-[15px] text-gray-500 font-body leading-relaxed">
              Your contribution helps us empower the next generation of Islamic leaders
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Donation Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-black/10 via-black/5 to-transparent h-full">
              <Card className="p-8 md:p-10 bg-black text-white h-full rounded-[calc(1.5rem-1px)]">
                <LiquidGlass variant="dark" intensity={1} duration={10}>
                <div className="w-12 h-12 bg-white/[0.08] rounded-xl flex items-center justify-center mb-7 border border-white/[0.06]">
                  <Heart className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                  <h3 className="text-xl font-display mb-4">Donate Now</h3>
                  <p className="text-white/60 font-body mb-7 text-[15px] leading-relaxed">
                    Support the development of facilities and educational programs at
                    
                  </p>

                  <div className="divider-elegant-white mb-7" />

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      <span className="text-sm font-body text-white/80">BSI {CONTACT_INFO.donation.accountNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-body text-white/40 ml-7">a.n. {CONTACT_INFO.donation.accountName}</span>
                    </div>
                  </div>

                <Link href="/support">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 btn-premium">
                    Donate Now
                  </Button>
                </Link>
                </LiquidGlass>
              </Card>
            </div>
          </motion.div>

          {/* Sponsorship Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
          >
            <Card className="p-8 md:p-10 bg-gray-50/80 border border-black/[0.04] h-full rounded-3xl card-premium">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-7">
                <HandHeart className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display text-black mb-4">Become a Sponsor</h3>
              <p className="text-gray-500 font-body mb-7 text-[15px] leading-relaxed">
                Partner with us for Muhadhoroh Kubro and gain visibility among
                our community.
              </p>

              <div className="divider-elegant mb-7" />

              <div className="space-y-3 mb-8">
                {CONTACT_INFO.admins.map((admin) => (
                  <div key={admin.name} className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                    <span className="text-sm font-body text-gray-500">
                      {admin.phone} ({admin.name})
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/support">
                <Button className="w-full bg-black text-white hover:bg-gray-800 btn-premium">
                  Become a Sponsor
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
