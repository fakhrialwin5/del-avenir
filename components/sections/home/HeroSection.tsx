'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlurText from '@/components/ui/BlurText';

/* ── Video Background with Fade Loop ── */
function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const video = videoRef.current;
    let animationFrameId: number;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (currentTime < 0.5) {
        video.style.opacity = String(currentTime / 0.5);
      } else if (currentTime > duration - 0.5) {
        video.style.opacity = String((duration - currentTime) / 0.5);
      } else {
        video.style.opacity = '1';
      }

      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark gradient placeholder — renders immediately on SSR/SSG and before video loads */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #111827 40%, #0f172a 100%)' }}
      />

      {mounted && (
        <video
          ref={videoRef}
          style={{
            top: '200px',
            inset: 'auto 0 0 0',
            opacity: 0,
          }}
          className="absolute w-full h-full object-cover md:top-[300px]"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/green-fields-and-peaks.960x540.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlays for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}

/* ── Floating Particles (Client-side only) ── */
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

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

/* ── Hero Section ── */
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Hero section"
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Video Background */}
      <VideoBackground />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 pt-20 pb-12">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 text-[11px] font-body font-medium tracking-[0.18em] uppercase text-white/80 border border-white/20 rounded-full bg-white/[0.06] backdrop-blur-sm">
            Generasi 11 Baitul Qur&apos;an
          </span>
        </motion.div>

        {/* Main Headline */}
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

        {/* Description - max 20 words */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-base sm:text-lg max-w-xl mt-8 text-center leading-relaxed text-white/70 font-body"
        >
          Nurturing the next generation of Islamic leaders through Quranic values,
          academic excellence, and artistic creativity.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-body font-medium text-black btn-premium"
          >
            Begin Journey
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.06] text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
