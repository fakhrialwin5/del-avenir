'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSplitText } from '@/lib/hooks/useSplitText';

type TextRevealTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';

const MOTION_TAGS = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  span: motion.span,
  div: motion.div,
} as const;

interface TextRevealProps {
  text: string;
  className?: string;
  as?: TextRevealTag;
  mode?: 'words' | 'chars';
  fromColor?: string;
  toColor?: string;
  fromOpacity?: number;
  toOpacity?: number;
  startOffset?: string;
  endOffset?: string;
}

function RevealToken({
  children,
  progress,
  range,
  fromColor,
  toColor,
  fromOpacity,
  toOpacity,
}: {
  children: ReactNode;
  progress: import('framer-motion').MotionValue<number>;
  range: [number, number];
  fromColor: string;
  toColor: string;
  fromOpacity: number;
  toOpacity: number;
}) {
  const color = useTransform(progress, range, [fromColor, toColor]);
  const opacity = useTransform(progress, range, [fromOpacity, toOpacity]);
  return (
    <motion.span style={{ color, opacity }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

export default function TextReveal({
  text,
  className,
  as = 'p',
  mode = 'words',
  fromColor = 'rgba(0,0,0,0.18)',
  toColor = 'rgba(0,0,0,1)',
  fromOpacity = 0.25,
  toOpacity = 1,
  startOffset = 'start 85%',
  endOffset = 'end 45%',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const tokens = useSplitText(text, mode);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset] as never,
  });

  const MotionTag = MOTION_TAGS[as];

  if (reduceMotion) {
    const StaticTag = MOTION_TAGS[as];
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <MotionTag ref={ref as never} className={cn('font-display', className)}>
      {tokens.map((token, index) => {
        if (token.isSpace) {
          return <span key={token.key}>{token.text}</span>;
        }
        const start = index / tokens.length;
        const end = start + 1 / tokens.length;
        return (
          <RevealToken
            key={token.key}
            progress={scrollYProgress}
            range={[start, end]}
            fromColor={fromColor}
            toColor={toColor}
            fromOpacity={fromOpacity}
            toOpacity={toOpacity}
          >
            {token.text}
          </RevealToken>
        );
      })}
    </MotionTag>
  );
}
