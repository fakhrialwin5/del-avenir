'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with IntersectionObserver
    // This ensures scroll-based animations work properly
    const syncScroll = () => {
      // Dispatch a scroll event so IntersectionObserver can detect it
      window.dispatchEvent(new Event('scroll'));
    };

    lenis.on('scroll', syncScroll);

    return () => {
      lenis.off('scroll', syncScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
