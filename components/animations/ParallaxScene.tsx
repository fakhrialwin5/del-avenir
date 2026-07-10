'use client';

import {
  useRef,
  useContext,
  useEffect,
  useState,
  createContext,
  type ReactNode,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const ParallaxContext = createContext<MotionValue<number> | null>(null);
export { ParallaxContext };

interface ParallaxSceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
  offset?: readonly [string, string];
}

export default function ParallaxScene({
  children,
  className,
  id,
  offset = ['start end', 'end start'],
}: ParallaxSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return (
    <ParallaxContext.Provider value={scrollYProgress}>
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 40,
  className,
}: ParallaxLayerProps) {
  const progress = useContext(ParallaxContext);
  const reduceMotion = useReducedMotion();
  const [coarse, setCoarse] = useState(false);
  const fallback = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const effective = reduceMotion ? 0 : coarse ? speed * 0.35 : speed;
  const source = progress ?? fallback;
  const y = useTransform(source, [0, 1], [effective, -effective]);

  if (!progress || effective === 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={cn('will-change-transform', className)}>
      {children}
    </motion.div>
  );
}
