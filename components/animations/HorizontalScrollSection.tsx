'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  height?: string;
  spring?: { stiffness: number; damping: number; mass: number };
}

export default function HorizontalScrollSection({
  children,
  className,
  trackClassName,
  height = '300vh',
  spring = { stiffness: 100, damping: 30, mass: 0.3 },
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const x = useSpring(xRaw, spring);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      setDistance(Math.max(0, track.scrollWidth - container.offsetWidth));
    };

    measure();
    window.addEventListener('resize', measure);
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);

    return () => {
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);

  if (reduceMotion) {
    return (
      <section className={cn('w-full overflow-x-auto', className)}>
        <div className={cn('flex gap-6 w-max px-6 py-10', trackClassName)}>{children}</div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className={cn('relative w-full', className)} style={{ height }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={cn(
            'flex w-max gap-6 px-6 will-change-transform',
            trackClassName
          )}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
