'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  poster?: string;
  priority?: boolean;
  className?: string;
}

export default function VideoBackground({
  videoSrc,
  poster,
  priority = false,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const video = videoRef.current;
    let animationFrameId: number;

    const handleTimeUpdate = () => {
      if (!video.duration) return;

      const currentTime = video.currentTime;
      const duration = video.duration;

      // Fade in over 0.5s at the start
      if (currentTime < 0.5) {
        video.style.opacity = String(currentTime / 0.5);
      }
      // Fade out over 0.5s before the end
      else if (currentTime > duration - 0.5) {
        video.style.opacity = String((duration - currentTime) / 0.5);
      }
      // Full opacity in between
      else {
        video.style.opacity = '1';
      }

      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Start playback
    video.play().catch(() => {
      // Autoplay blocked, that's okay
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  // Always render the container with gradient placeholder.
  // The video element only renders after hydration (mounted=true).
  // This ensures a dark gradient is visible immediately — critical for LCP.
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark gradient placeholder — always visible, even before hydration.
          This is the key LCP fix: the hero sections use dark overlays anyway,
          so a gradient placeholder eliminates the black-screen flash. */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

      {/* Poster image — shown behind the video if provided */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Video — only mounts after hydration to avoid SSR flash / null render */}
      {mounted && (
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          style={{
            top: '300px',
            inset: 'auto 0 0 0',
            opacity: 0,
          }}
          loop
          muted
          playsInline
          preload={priority ? 'metadata' : 'none'}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlays matching reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
  );
}
