"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className,
}: TypewriterTextProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedChars < text.length) {
      const interval = setInterval(() => {
        setDisplayedChars((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(interval);
    }
  }, [started, speed, text.length, displayedChars]);

  return (
    <span className={className}>
      {text.slice(0, displayedChars)}
      {displayedChars >= text.length ? null : (
        <span className="inline-block w-[2px] h-[1em] bg-current animate-pulse ml-[1px] align-middle" />
      )}
    </span>
  );
}
