'use client';

import { type RefObject } from 'react';
import {
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';

export type ScrollOffset = [string, string];

export const DEFAULT_OFFSET: ScrollOffset = ['start end', 'end start'];

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 120,
  damping: 30,
  mass: 0.2,
};

export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  offset: ScrollOffset = DEFAULT_OFFSET
) {
  return useScroll({ target: ref, offset: offset as never });
}

export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  amount = 100,
  offset: ScrollOffset = DEFAULT_OFFSET
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  return useTransform(scrollYProgress, [0, 1], [amount, -amount]);
}

export function useScaleOnScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    from = 1,
    to = 0.95,
    offset = DEFAULT_OFFSET,
  }: { from?: number; to?: number; offset?: ScrollOffset } = {}
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
}

export function useOpacityOnScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    from = 1,
    to = 0,
    offset = DEFAULT_OFFSET,
  }: { from?: number; to?: number; offset?: ScrollOffset } = {}
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
}

export function useBlurOnScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    from = 0,
    to = 12,
    offset = DEFAULT_OFFSET,
  }: { from?: number; to?: number; offset?: ScrollOffset } = {}
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
}

export interface ScrollVelocity {
  raw: MotionValue<number>;
  smooth: MotionValue<number>;
  direction: MotionValue<number>;
}

export function useScrollVelocity(spring: SpringOptions = DEFAULT_SPRING): ScrollVelocity {
  const { scrollY } = useScroll();
  const raw = useVelocity(scrollY);
  const smooth = useSpring(raw, spring);
  const direction = useTransform(raw, (v) => (Math.abs(v) < 0.1 ? 0 : Math.sign(v)));
  return { raw, smooth, direction };
}

export function useSmoothValue(
  value: MotionValue<number>,
  spring: SpringOptions = DEFAULT_SPRING
): MotionValue<number> {
  return useSpring(value, spring);
}
