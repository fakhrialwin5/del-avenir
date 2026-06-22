'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(255,255,255,0.1)',
  borderColor = 'rgba(0,0,0,0.1)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMousePos({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={cn(
        'relative overflow-hidden rounded-card bg-white transition-all duration-300',
        className,
      )}
      style={{
        borderColor: isHovered ? spotlightColor : borderColor,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x + 200}px ${mousePos.y + 200}px, ${spotlightColor}, transparent 80%)`
            : 'transparent',
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-card"
        style={{
          opacity: isHovered ? 0.5 : 0,
          boxShadow: `inset 0 0 20px 2px ${spotlightColor}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
