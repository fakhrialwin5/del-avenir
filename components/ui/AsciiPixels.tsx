'use client';

import { useMemo, useState, useEffect } from 'react';

const PIXELS = ['·', '•', '*', '+', '×', '·', '•'];

export default function AsciiPixels() {
  const [mounted, setMounted] = useState(false);

  // Generated after mount so SSR and the first client render both output
  // `null` — avoids a hydration mismatch from Math.random().
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: PIXELS[i % PIXELS.length],
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 50 + Math.random() * 30, // 50-80px
      opacity: 0.03 + Math.random() * 0.06,
      duration: 20 + Math.random() * 40,
      delay: Math.random() * 20,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-white select-none"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `ascii-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
