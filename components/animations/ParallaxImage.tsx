'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  overlay?: boolean;
  overlayClassName?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt = '',
  className,
  containerClassName,
  speed = 60,
  overlay = false,
  overlayClassName,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      {reduceMotion ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn('h-full w-full object-cover', className)}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ y }}
          className={cn('absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover will-change-transform', className)}
        />
      )}
      {overlay && (
        <div className={cn('absolute inset-0 bg-black/20', overlayClassName)} />
      )}
    </div>
  );
}
