'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-cream py-section sm:py-section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about donations and sponsorships"
          />
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal
                key={index}
                delay={index * 0.1}
                variant="fadeUp"
              >
                <div className="overflow-hidden rounded-card border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                  {/* Question Button */}
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold text-foreground">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                        isOpen
                          ? 'bg-gold/10 text-gold'
                          : 'bg-gray-100 text-gray-500',
                      )}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>

                  {/* Answer with smooth height animation */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: 'easeInOut' },
                          opacity: { duration: 0.2, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 px-6 py-5">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
