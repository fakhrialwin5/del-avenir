'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

/* ── Types ── */
interface GradientTextProps {
  /** Text content */
  children: React.ReactNode;
  /** Colors for the gradient (array of CSS color strings) */
  colors?: string[];
  /** Speed of the gradient animation in seconds */
  animationSpeed?: number;
  /** Direction of the gradient animation */
  direction?: 'horizontal' | 'vertical';
  /** Additional CSS classes */
  className?: string;
}

/* ── Component ── */
export function GradientText({
  children,
  colors = ['#000000', '#6F6F6F', '#000000'],
  animationSpeed = 4,
  direction = 'horizontal',
  className,
}: GradientTextProps) {
  const gradientStyle = useMemo(() => {
    const angle = direction === 'horizontal' ? '90deg' : '180deg';
    const repeatedColors: string[] = [];
    // Repeat the colors enough times for smooth looping
    for (let i = 0; i < 4; i++) {
      repeatedColors.push(...colors);
    }
    const gradientStr = `linear-gradient(${angle}, ${repeatedColors.join(', ')})`;
    const sizePercent = `${(100 / colors.length) * 100}%`;

    return {
      background: gradientStr,
      backgroundSize: `${sizePercent} 100%`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      animation: `gradientShift ${animationSpeed}s linear infinite`,
    } as React.CSSProperties;
  }, [colors, animationSpeed, direction]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
          `,
        }}
      />
      <span
        style={gradientStyle}
        className={cn('inline-block', className)}
      >
        {children}
      </span>
    </>
  );
}

export default GradientText;
