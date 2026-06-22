'use client';

import {
  motion,
  useAnimation,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

type RevealVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp';

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollReveal({
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  amount = 0.15,
  once = true,
  className,
  children,
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkVisibility = () => {
      if (hasAnimated.current && once) return true;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element is visible if its top is below the viewport threshold
      if (rect.top < windowHeight * (1 - amount) && rect.bottom > 0) {
        controls.start('visible');
        hasAnimated.current = true;
        return true;
      }
      return false;
    };

    // Check immediately in case element is already visible
    if (checkVisibility()) return;

    // Periodic check – works reliably with Lenis smooth scroll
    // which breaks IntersectionObserver via CSS translate3d transforms
    const interval = setInterval(() => {
      if (!hasAnimated.current || !once) {
        checkVisibility();
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [controls, amount, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variantMap[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
