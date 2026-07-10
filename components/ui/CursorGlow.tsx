'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if mouse is over a dark section
      const target = e.target as HTMLElement;
      const isDark = target.closest('[data-section="dark"]') !== null;
      if (glowRef.current) {
        if (isDark) {
          glowRef.current.classList.add('active');
        } else {
          glowRef.current.classList.remove('active');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={glowRef}
      className="cursor-glow hidden md:block"
      style={{
        left: springX,
        top: springY,
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
