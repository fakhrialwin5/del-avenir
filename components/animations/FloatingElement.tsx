"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface FloatingElementProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export default function FloatingElement({
  amplitude = 10,
  duration = 3,
  delay = 0,
  className,
  children,
  ...rest
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
