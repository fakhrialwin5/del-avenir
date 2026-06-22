'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/* ── Types ── */

interface SectionHeadingProps {
  /** Main heading text */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Extra CSS classes for the outer wrapper */
  className?: string;
  /** Extra CSS classes for the title */
  titleClassName?: string;
  /** Dark mode variant */
  dark?: boolean;
}

/* ── Component ── */

export function SectionHeading({
  title,
  subtitle,
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn('text-center mb-16 md:mb-20', className)}
    >
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-tight',
          dark ? 'text-white' : 'text-black',
          titleClassName
        )}
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>

      {/* Elegant hairline divider */}
      <div
        className={cn(
          'mx-auto mt-5 h-px w-12',
          dark ? 'bg-white/20' : 'bg-black/15'
        )}
      />

      {subtitle && (
        <p
          className={cn(
            'mx-auto mt-5 max-w-xl text-[15px] font-body leading-relaxed',
            dark ? 'text-white/50' : 'text-gray-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
