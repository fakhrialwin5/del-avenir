"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBackground from "@/components/ui/AuroraBackground";

interface LoadingScreenProps {
  isLoading: boolean;
}

/* ── Seeded PRNG (deterministic, same on server & client) ── */
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Animated geometric lines (reduced from 6 to 4) ── */
function GeometricLines() {
  const lines = useMemo(
    () => [
      { x1: "10%", y1: "20%", x2: "30%", y2: "40%", delay: 0.5 },
      { x1: "70%", y1: "15%", x2: "85%", y2: "35%", delay: 0.8 },
      { x1: "15%", y1: "65%", x2: "35%", y2: "85%", delay: 1.0 },
      { x1: "65%", y1: "70%", x2: "90%", y2: "80%", delay: 1.2 },
    ],
    []
  );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2, delay: line.delay, ease: "easeInOut" },
            opacity: { duration: 0.5, delay: line.delay },
          }}
        />
      ))}
    </svg>
  );
}

/* ── Floating particles (reduced from 20 to 8, longer cycles) ── */
function FloatingParticles() {
  const particles = useMemo(() => {
    const rand = mulberry32(42);
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      size: rand() * 1.5 + 0.8,
      duration: rand() * 15 + 15,
      delay: rand() * 8,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -600],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Radial ring pulse (reduced from 3 to 2 rings) ── */
function RadialPulse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 0.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/[0.04]"
          initial={{ width: 60, height: 60, opacity: 0 }}
          animate={{
            width: [60, 300],
            height: [60, 300],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Letter-by-letter cinematic reveal ── */
function CinematicText({
  text,
  className,
  delay,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={className}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  /* progress counter */
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 4 + 1.5, 100));
    }, 50);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "#000000" }}
        >
          {/* ── Background Layer ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0a0a0a]" />

          {/* ── Noise texture overlay ── */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* ── Aurora Background ── */}
          <AuroraBackground
            colors={["#1a1a2e", "#16213e", "#0f3460"]}
            speed={0.5}
            amplitude={0.8}
            className="opacity-40"
          />
          <GeometricLines />
          <FloatingParticles />
          <RadialPulse />

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          {/* ── Center Content ── */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Decorative expanding line */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                className="h-px bg-white/20"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* Glow on line */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  filter: "blur(4px)",
                }}
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* Title with cinematic reveal */}
            <div className="text-center">
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
                <CinematicText text="Del'Avenir" delay={0.9} />
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1,
                  delay: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 text-xs md:text-sm font-body text-white/30 tracking-[0.4em] uppercase"
              >
                Generasi 11 Baitul Qur&apos;an
              </motion.p>
            </div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Progress bar with glow */}
              <div className="relative w-48 md:w-56">
                {/* Track */}
                <div className="h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                {/* Glow effect */}
                <motion.div
                  className="absolute -top-1 h-3 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)",
                    filter: "blur(4px)",
                    left: `${Math.max(0, progress - 5)}%`,
                    width: "10%",
                  }}
                />
              </div>

              {/* Percentage counter */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[10px] font-body text-white/20 tabular-nums tracking-[0.3em]"
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          </div>

          {/* ── Corner accents ── */}
          {[
            "top-8 left-8",
            "top-8 right-8 rotate-90",
            "bottom-8 right-8 rotate-180",
            "bottom-8 left-8 -rotate-90",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 1L1 8M1 1L8 1"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
