'use client';

import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export type RevealType = 'fade' | 'clipUp' | 'clipLeft' | 'blur' | 'scale' | 'slideUp';

interface SmoothRevealProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  type?: RevealType;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  parallax?: number;
  className?: string;
  children: ReactNode;
}

function buildVariants(type: RevealType, duration: number): Variants {
  switch (type) {
    case 'clipUp':
      return {
        hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        visible: {
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case 'clipLeft':
      return {
        hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        visible: {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case 'blur':
      return {
        hidden: { opacity: 0, filter: 'blur(14px)', y: 20 },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.82 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case 'slideUp':
      return {
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
      };
  }
}

export default function SmoothReveal({
  type = 'fade',
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  once = true,
  parallax = 0,
  className,
  children,
  ...rest
}: SmoothRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  const variants = buildVariants(type, duration);

  const inner = (
    <motion.div
      className="h-full w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );

  if (parallax === 0) {
    return (
      <motion.div ref={ref} className={className} {...rest}>
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} className={cn('will-change-transform', className)} {...rest}>
      <motion.div style={{ y: parallaxY }} className="will-change-transform">
        {inner}
      </motion.div>
    </motion.div>
  );
}
