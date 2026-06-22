'use client';

import { useState, useEffect } from 'react';

interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  startDelay?: number;
}

export default function CountUp({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  startDelay = 0,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>;
    let rafId: number;
    let mounted = true;

    startTimer = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        if (!mounted) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(eased * target));

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      mounted = false;
      clearTimeout(startTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, startDelay]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
