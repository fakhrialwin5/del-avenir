"use client";

import { useMemo } from "react";

interface AuroraBackgroundProps {
  colors?: string[];
  speed?: number;
  amplitude?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Pure-CSS aurora background — no canvas, no requestAnimationFrame.
 * Uses layered radial gradients with CSS @keyframes for GPU-composited animation.
 * Significantly lighter than the previous canvas implementation.
 */
export default function AuroraBackground({
  colors = ["#1a1a2e", "#16213e", "#0f3460"],
  speed = 1,
  amplitude = 1,
  className = "",
  children,
}: AuroraBackgroundProps) {
  // Convert speed (1 = normal) to animation duration in seconds
  const duration = useMemo(() => {
    const base = 8; // seconds at speed=1
    return base / speed;
  }, [speed]);

  // Scale translates for amplitude
  const drift = useMemo(() => {
    const px = Math.round(amplitude * 40);
    return { x: px, y: Math.round(px * 0.6) };
  }, [amplitude]);

  // Parse colors to rgba with varying alpha
  const layers = useMemo(() => {
    return colors.map((hex, i) => {
      const parsed = parseColor(hex);
      if (!parsed) return null;
      const { r, g, b } = parsed;
      const alpha = 0.25 - i * 0.04;
      return { r, g, b, alpha, index: i };
    }).filter(Boolean) as { r: number; g: number; b: number; alpha: number; index: number }[];
  }, [colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ willChange: "transform" }}>
      {/* Static base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 50%, ${colors[0]}40 0%, transparent 70%)`,
        }}
      />

      {/* Animated aurora layers */}
      {layers.map((layer) => (
        <div
          key={layer.index}
          className="absolute inset-0"
          style={{
            willChange: "transform",
            background: `radial-gradient(ellipse 100% 60% at ${50 + (layer.index % 2 === 0 ? -10 : 10)}% ${40 + layer.index * 15}%, rgba(${layer.r},${layer.g},${layer.b},${layer.alpha}) 0%, transparent 70%)`,
            animation: `aurora-float-${layer.index} ${duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* CSS keyframes injected once */}
      <style jsx>{`
        ${layers.map((layer) => {
          const xDrift = layer.index % 2 === 0 ? drift.x : -drift.x;
          const yDrift = layer.index % 3 === 0 ? drift.y : -drift.y;
          return `
            @keyframes aurora-float-${layer.index} {
              0% {
                transform: translate(${-xDrift}px, ${-yDrift}px) scale(1);
                opacity: 0.7;
              }
              50% {
                transform: translate(${xDrift * 0.3}px, ${yDrift * 0.5}px) scale(1.05);
                opacity: 1;
              }
              100% {
                transform: translate(${xDrift}px, ${yDrift}px) scale(1);
                opacity: 0.8;
              }
            }
          `;
        }).join("\n")}
      `}</style>

      {/* Soft dark wash overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {children}
    </div>
  );
}

/* ── Parse hex color to RGB ── */
function parseColor(hex: string): { r: number; g: number; b: number } | null {
  if (hex.startsWith("rgba")) {
    const m = hex.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  }
  if (hex.startsWith("rgb")) {
    const m = hex.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  }
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  }
  return null;
}
