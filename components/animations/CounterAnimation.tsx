"use client";

import { useRef, useState, useEffect } from "react";

interface CounterAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        // Start counter animation
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        
        const animate = () => {
          const currentTime = Date.now();
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          setDisplayValue(Math.round(easeProgress * target));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
        setHasAnimated(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkVisibility()) return;

    // Listen for scroll events
    const handleScroll = () => {
      if (!hasAnimated) {
        checkVisibility();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Also check periodically
    const interval = setInterval(() => {
      if (!hasAnimated) {
        checkVisibility();
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
