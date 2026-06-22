'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
}

export default function VideoBackground({ videoSrc, className = '' }: VideoBackgroundProps) {
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

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        style={{ 
          top: '300px',
          inset: 'auto 0 0 0',
          opacity: 0 
        }}
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradient overlays matching reference */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
  );
}
