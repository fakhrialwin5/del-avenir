'use client';

import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';

/* ── Types ── */
interface BlurTextProps {
  /** The text to animate */
  text: string;
  /** Animate by words or letters */
  animateBy?: 'words' | 'letters';
  /** Direction of blur/displacement animation */
  direction?: 'top' | 'bottom';
  /** Initial delay before animation starts (ms) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

/* ── Component ── */
export function BlurText({
  text,
  animateBy = 'words',
  direction = 'top',
  delay = 0,
  className = '',
}: BlurTextProps) {
  const items = useMemo(() => {
    if (animateBy === 'words') {
      return text.split(' ');
    }
    return text.split('');
  }, [text, animateBy]);

  const staggerDelay = 0.04;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay / 1000,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      filter: 'blur(12px)',
      opacity: 0,
      y: direction === 'top' ? -30 : 30,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={childVariants}
          className="inline-block whitespace-pre"
        >
          {item}
          {animateBy === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default BlurText;
