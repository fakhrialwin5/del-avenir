import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ── Variant Maps ── */

const colorStyles = {
  gold: 'bg-gold/15 text-gold-dark border border-gold/30',
  green: 'bg-green/10 text-green border border-green/20',
  gray: 'bg-gray-200 text-gray-700 border border-gray-300',
  amber: 'bg-amber-100 text-amber-800 border border-amber-200',
} as const;

/* ── Types ── */

type BadgeColor = keyof typeof colorStyles;

interface BadgeProps {
  children: ReactNode;
  /** Badge color variant */
  color?: BadgeColor;
  /** Optional icon or element before children */
  icon?: ReactNode;
  /** Extra CSS classes */
  className?: string;
}

/* ── Component ── */

export function Badge({
  children,
  color = 'gold',
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium leading-none',
        colorStyles[color],
        className,
      )}
    >
      {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
      {children}
    </span>
  );
}
