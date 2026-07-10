'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  spring?: { stiffness: number; damping: number; mass: number };
}

export interface MagneticResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  { strength = 0.4, radius = 0, spring }: MagneticOptions = {}
): MagneticResult<T> {
  const ref = useRef<T | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const springConfig = spring ?? { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const relX = event.clientX - centerX;
      const relY = event.clientY - centerY;

      if (radius > 0) {
        const distance = Math.hypot(relX, relY);
        if (distance > radius) {
          x.set(0);
          y.set(0);
          return;
        }
      }

      x.set(relX * strength);
      y.set(relY * strength);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength, radius, reduceMotion, x, y]);

  return { ref, x: springX, y: springY };
}
