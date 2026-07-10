'use client';

import { useState, useEffect } from 'react';
import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const HOME_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'vision', label: 'Vision' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'muhadhoroh', label: 'Muhadhoroh' },
  { id: 'community', label: 'Community' },
  { id: 'support', label: 'Support' },
] as const;

export default function ScrollProgress() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const shouldReduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const observers: IntersectionObserver[] = [];

    HOME_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          rootMargin: '-45% 0px -45% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isHome]);

  return (
    <>
      {shouldReduceMotion ? (
        <div className="scroll-progress-bar" style={{ transform: 'scaleX(1)' }} />
      ) : (
        <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      )}

      {isHome && (
        <nav className="hidden md:flex z-40 fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-3">
          {HOME_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              aria-label={label}
              title={label}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className={cn('wayfinding-dot', activeId === id && 'wayfinding-dot-active')}
            />
          ))}
        </nav>
      )}
    </>
  );
}
