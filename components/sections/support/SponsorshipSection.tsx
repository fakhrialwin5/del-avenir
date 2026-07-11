'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SPONSORSHIP_TIERS } from '@/lib/constants';

const featuredTiers = SPONSORSHIP_TIERS.filter(t => t.featured);
const standardTiers = SPONSORSHIP_TIERS.filter(t => !t.featured);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function TierCard({ tier, index, isFeatured }: { tier: typeof SPONSORSHIP_TIERS[0]; index: number; isFeatured: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative rounded-2xl border bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isFeatured
          ? 'border-black shadow-md lg:scale-[1.02]'
          : 'border-gray-200'
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Featured
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold text-black">
          {tier.tier}
        </h3>
        <p className="mt-1 font-display text-2xl sm:text-3xl font-bold text-black">
          {tier.price}
        </p>
      </div>

      <div className="h-px w-full bg-gray-100 mb-5" />

      <ul className="space-y-2.5">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-black" strokeWidth={2.5} />
            <span className="text-sm text-gray-600 leading-relaxed">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          variant={isFeatured ? 'primary' : 'secondary'}
          size="md"
          href="https://wa.me/62895401209855"
          className="w-full"
        >
          Daftar Sponsorship
        </Button>
      </div>
    </motion.div>
  );
}

export default function SponsorshipSection() {
  return (
    <section id="sponsorship" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionHeading
            title="Sponsorship"
            subtitle="Partner with us to nurture future leaders through various sponsorship opportunities"
          />
        </motion.div>

        {/* Featured Tiers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-2 mb-6"
        >
          {featuredTiers.map((tier, i) => (
            <TierCard key={tier.tier} tier={tier} index={i} isFeatured={true} />
          ))}
        </motion.div>

        {/* Standard Tiers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {standardTiers.map((tier, i) => (
            <TierCard key={tier.tier} tier={tier} index={i} isFeatured={false} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-gray-500"
        >
          Ingin paket sponsorship custom? Hubungi kami untuk diskusi lebih lanjut.
        </motion.p>
      </div>
    </section>
  );
}
