'use client';

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ── Variant / Size Maps ── */

const variantStyles = {
  primary:
    'bg-gold text-green-dark font-semibold hover:bg-gold-dark',
  secondary:
    'border-2 border-gold bg-transparent text-gold hover:bg-gold/10',
  ghost:
    'bg-transparent text-gold hover:text-gold-dark',
  dark:
    'bg-green text-cream font-semibold hover:bg-green-dark',
} as const;

const sizeStyles = {
  sm: 'px-4 py-1.5 text-sm rounded',
  md: 'px-6 py-2.5 text-base rounded-md',
  lg: 'px-8 py-3.5 text-lg rounded-lg',
} as const;

/* ── Types ── */

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

/* ── Component ── */

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      href,
      children,
      className,
      disabled = false,
      type = 'button',
      onClick,
    },
    ref,
  ) {
    const classes = cn(
      'inline-flex items-center justify-center font-body transition-colors duration-200 select-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      'cursor-pointer',
      variantStyles[variant],
      sizeStyles[size],
      disabled && 'pointer-events-none opacity-50',
      className,
    );

    if (href && !disabled) {
      return (
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.03, boxShadow: '0 10px 30px -5px rgb(212 175 55 / 0.35)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
        >
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={classes}
          >
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        type={type}
        onClick={onClick}
        whileHover={disabled ? undefined : { scale: 1.03, boxShadow: '0 10px 30px -5px rgb(212 175 55 / 0.35)' }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.button>
    );
  },
);
