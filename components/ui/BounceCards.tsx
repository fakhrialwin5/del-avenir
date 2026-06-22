'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BounceCardsProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function BounceCards({
  children,
  staggerDelay = 0.15,
  className,
}: BounceCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isAnimated) return;

    const interval = setInterval(() => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
        controls.start('visible');
        setIsAnimated(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [controls, isAnimated]);

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      ref={ref}
      className={cn('grid grid-cols-1 md:grid-cols-3 gap-8', className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 30 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 18,
                duration: 0.6,
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
