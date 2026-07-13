import { useEffect, useRef, useState } from 'react';
import { DRONE_VIDEO_SRC, DRONE_FPS } from '@/lib/drone';

interface DroneVideoBackgroundProps {
  videoSrc?: string;
  trackRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function DroneVideoBackground({
  videoSrc,
  trackRef,
  className = '',
}: DroneVideoBackgroundProps) {
  const src = videoSrc ?? DRONE_VIDEO_SRC;
  const fps = DRONE_FPS || 30;
  const frameDur = 1 / fps;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  // Desktop scroll scrubbing only — maps the TRACK's own scroll range
  // (not the whole document) to the full video, so the entire flight
  // plays across the full 450vh hero, never a short slice.
  useEffect(() => {
    if (!mounted || isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      setDuration(video.duration || 0);
      video.currentTime = 0;
      setReady(true);
    };
    video.addEventListener('loadedmetadata', onMeta);

    const animate = () => {
      if (isMobile) return;
      let target = 0;
      if (trackRef?.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        target = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        target = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      }

      if (duration > 0) {
        const exact = target * duration;
        const t = Math.min(duration, Math.max(0, Math.round(exact / frameDur) * frameDur));
        const frameIdx = Math.round(t * fps);
        if (frameIdx !== video.currentTime) video.currentTime = t;
      }
    };

    window.addEventListener('scroll', animate, { passive: true });
    window.addEventListener('resize', animate);
    animate();

    const rafId = requestAnimationFrame(() => requestAnimationFrame(animate));

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', animate);
      window.removeEventListener('resize', animate);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, isMobile, duration, frameDur, fps, trackRef]);

  // Mobile autoplay
  useEffect(() => {
    if (!mounted || !videoRef.current) return;
    const video = videoRef.current;
    if (isMobile && video.paused) {
      const playIt = () => {
        video.play().catch(() => {});
      };
      // Small timeout to allow DOM hydration
      const t = setTimeout(playIt, 150);
      return () => clearTimeout(t);
    }
  }, [isMobile, mounted]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      {mounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.04)', opacity: ready ? 1 : 0, transition: 'opacity 0.7s ease' }}
          muted
          playsInline
          preload="auto"
          loop={isMobile}
          autoPlay={isMobile}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.32)_100%)]" />
    </div>
  );
}