'use client';

import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  /** 'light' | 'dark' — controls background opacity for contrast against light/dark sections */
  variant?: 'light' | 'dark';
  /** Distortion intensity multiplier (default 1) */
  intensity?: number;
  /** Animation duration in seconds (default 8) */
  duration?: number;
}

/**
 * LiquidGlass — glassmorphism panel with animated SVG liquid distortion overlay.
 *
 * Uses CSS @property animated `--liquid-base-frequency` and `--liquid-scale`
 * for GPU-composited morphing without JS animation loops.
 *
 * Usage:
 *   <LiquidGlass variant="dark" intensity={1.2}>
 *     <div>content</div>
 *   </LiquidGlass>
 */
export default function LiquidGlass({
  children,
  className,
  variant = 'light',
  intensity = 1,
  duration = 8,
}: LiquidGlassProps) {
  const filterId = useId().replace(/:/g, '-');
  const scale = Math.round(6 * intensity);

  return (
    <div
      className={cn(
        'liquid-glass',
        variant === 'dark' && 'liquid-glass--dark',
        className
      )}
    >
      {/* SVG filter definition — must be in DOM for reference */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} />
          </filter>
        </defs>
      </svg>

      {/* Distortion overlay */}
      <div
        className="liquid-glass__distortion"
        style={{ animationDuration: `${duration}s` }}
      >
        <svg aria-hidden="true">
          <rect
            width="100%"
            height="100%"
            style={{ filter: `url(#${filterId})` }}
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
