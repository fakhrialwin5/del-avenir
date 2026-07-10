'use client';

import { motion } from 'framer-motion';
import { useMagnetic } from '@/lib/hooks/useMagneticCursor';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  radius?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-body font-medium transition-colors duration-300 select-none';

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.4,
  radius = 0,
  ariaLabel,
  type = 'button',
  target,
  rel,
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>({ strength, radius });

  const innerClasses = cn(baseClasses, className);

  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block will-change-transform">
      {href ? (
        <a href={href} onClick={onClick} className={innerClasses} aria-label={ariaLabel} target={target} rel={rel}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={innerClasses} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
