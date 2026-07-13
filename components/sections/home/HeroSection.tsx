'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from '@/components/ui/BlurText';
import DroneVideoBackground from '@/components/sections/home/DroneVideoBackground';
import LiquidGlass from '@/components/ui/LiquidGlass';

/* ── Floating Particles (Client-side only) ── */
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  // Generated once, AFTER mount — so SSR and the first client render both
  // produce `null` (no hydration mismatch from Math.random()).
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        size: 1.5 + Math.random() * 2.5,
        duration: 18 + Math.random() * 22,
        delay: Math.random() * 12,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero / Drone Flight Section ── */
export default function HeroSection() {
  // The tall track whose scroll range scrubs the drone flight (no loop).
  const trackRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Scroll progress across the whole flight track (0 = start, 1 = arrived).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Hero content fades + lifts away gradually as the flight begins, then
  // stays permanently gone (no loop). Slower range = gentler "perlahan" exit.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={trackRef}
      aria-label="Drone flight through the landscape"
      data-section="dark"
      className="relative w-full bg-black"
      style={{ height: '450vh' }}
    >
      {/* Pinned viewport — stays fixed while the tall track scrolls past. */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Scroll-scrubbed drone footage (down = forward, up = backward). */}
        <DroneVideoBackground trackRef={trackRef} />

        <FloatingParticles />

        {/* Hero content overlay — fades as the flight takes over. */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex flex-col items-center justify-center h-[100dvh] px-6 pt-20 pb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <LiquidGlass variant="dark" intensity={0.8} duration={12}>
              <span className="inline-block px-5 py-2 text-[11px] font-body font-medium tracking-[0.18em] uppercase text-white/80 rounded-full">
                Generasi 11 Baitul Qur&apos;an
              </span>
            </LiquidGlass>
          </motion.div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-center max-w-6xl font-normal text-white"
            style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            <BlurText
              text="Beyond silence, we build the eternal."
              animateBy="words"
              direction="bottom"
              delay={100}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-base sm:text-lg max-w-xl mt-8 text-center leading-relaxed text-white/70 font-body"
          >
            Nurturing the next generation of Islamic leaders through Quranic values,
            academic excellence, and artistic creativity.
          </motion.p>

          <div className="marquee mt-8 w-full max-w-2xl">
            <div className="marquee__track text-white/50">
              {['Tahfidz', 'Arts', 'Leadership', 'Community', 'Excellence', 'Quranic Values', 'Academic', 'Creativity', 'Service', 'Unity'].map((item, i) => (
                <span key={i} className="marquee__item">
                  <span className="marquee__dot" />
                  {item}
                </span>
              ))}
              {['Tahfidz', 'Arts', 'Leadership', 'Community', 'Excellence', 'Quranic Values', 'Academic', 'Creativity', 'Service', 'Unity'].map((item, i) => (
                <span key={`dup-${i}`} className="marquee__item">
                  <span className="marquee__dot" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={scrollToAbout}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-body font-medium text-black btn-premium hover:bg-gray-100 transition-colors duration-300"
            >
              Begin Journey
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.08] text-black transition-all duration-300 group-hover:bg-black/10 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll-to-fly hint — disappears almost immediately on scroll. */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 pointer-events-none"
        >
          <span className="text-[10px] font-body uppercase tracking-[0.25em]">
            Scroll to fly
          </span>
          <span className="block w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
