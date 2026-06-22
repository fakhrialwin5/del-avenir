'use client';

import { type ReactNode, forwardRef } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ── Types ── */

interface CardProps {
  children: ReactNode;
  /** Optional image shown at the top of the card */
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  /** Add padding when there is no image */
  padding?: boolean;
  className?: string;
}

/* ── Framer Motion Variants ── */

const cardVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    borderColor: 'rgb(0 0 0 / 0)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.15)',
    borderColor: 'rgb(212 175 55 / 0.5)',
  },
};

/* ── Component ── */

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, image, padding = true, className }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover="hover"
        variants={cardVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={cn(
          'overflow-hidden rounded-card bg-white border border-gray-200',
          'transition-shadow duration-300',
          className,
        )}
      >
        {image && (
          <div className="relative w-full overflow-hidden bg-gray-100">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 600}
              height={image.height ?? 400}
              className="h-auto w-full object-cover"
              unoptimized
            />
          </div>
        )}

        <div className={cn(padding && 'p-6')}>{children}</div>
      </motion.div>
    );
  },
);
