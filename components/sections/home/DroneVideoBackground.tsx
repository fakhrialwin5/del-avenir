import { useEffect, useRef, useState, type RefObject } from 'react';
import { DRONE_VIDEO_SRC, DRONE_FPS } from '@/lib/drone';

interface DroneVideoBackgroundProps {
  videoSrc?: string;
  /** Ref to the tall scroll-track element whose scroll range scrubs the flight. */
  trackRef?: RefObject<HTMLElement | null>;
  priority?: boolean;
  className?: string;
}

/**
 * Scroll-controlled drone flight.
 *
 * The footage is NEVER autoplayed and NEVER looped. The page scroll scrubs
 * `video.currentTime` directly: scroll down = forward, scroll up = backward.
 *
 * To render EVERY frame cleanly (no cut / dropped frames) the source is an
 * all-intra (every-frame-keyframe) clip, and each seek is snapped to the exact
 * frame boundary at the clip's real fps. A per-frame easing lerp gives calm,
 * inertial, Apple-like motion. At the end of the track the flight simply holds
 * — there is no restart or loop.
 */
export default function DroneVideoBackground({
  videoSrc,
  trackRef,
  priority = false,
  className = '',
}: DroneVideoBackgroundProps) {
  const src = videoSrc ?? DRONE_VIDEO_SRC;
  const fps = DRONE_FPS || 30;
  const frameDur = 1 / fps;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Eased scrub state (0..1 across the flight).
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastSeekRef = useRef(-1); // last frame index we requested

  useEffect(() => {
    setMounted(true);
  }, []);

  // Throttle scroll computations to prevent seeking storms and frame drops
  let scrollTimeoutRef: NodeJS.Timeout | null = null;
  const THROTTLE_MS = 16; // Target ~60fps for updates (caps computation bursts)

  // Batching scroll computations to prevent excessive seeks
  const throttledComputeTarget = () => {
    if (scrollTimeoutRef) return;
    scrollTimeoutRef = setTimeout(() => {
      scrollTimeoutRef = null;
      computeTarget();
    }, THROTTLE_MS);
  };

  // Raw scroll progress from the track (or whole document as fallback).
  const computeTarget = () => {
    if (trackRef?.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? -rect.top / total : 0;
      targetRef.current = Math.min(1, Math.max(0, p));
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }
  };

  // Only one seek may be in flight at a time. We wait for the browser to
  // actually PRESENT the frame (requestVideoFrameCallback / 'seeked') before
  // issuing the next one. Without this gate the browser coalesces rapid
  // currentTime writes and silently drops the in-between frames — which is
  // exactly what makes the flight look choppy / "only a few frames".
  const seekingRef = useRef(false);
  const supportsRVFC =
    typeof HTMLVideoElement !== 'undefined' &&
    'requestVideoFrameCallback' in HTMLVideoElement.prototype;

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      setDuration(video.duration || 0);
      try {
        video.currentTime = 0; // prime the first frame
      } catch {
        /* not ready yet */
      }
      setReady(true);
    };
    video.addEventListener('loadedmetadata', onMeta);

    const onScroll = () => throttledComputeTarget();
    throttledComputeTarget();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Fired once the in-flight seek has been painted — clears the gate so a
    // new seek (if scroll moved on) can be issued immediately.
    const onPresented = () => {
      seekingRef.current = false;
    };
    if (supportsRVFC) {
      // requestVideoFrameCallback is one-shot; re-arm after each seek below.
      video.addEventListener('seeked', onPresented);
    }

    // Smoother scrubbing: lower inertia for immediate response
    const EASE = 0.18; // Increased from 0.12 for snappier feel
    const issueSeek = (t: number, frameIdx: number) => {
      // Atomic frame scheduling: protect against rapid seeks that cause dropped frames.
      if (seekingRef.current) return;
      lastSeekRef.current = frameIdx;
      seekingRef.current = true;
      try {
        video.currentTime = t;
      } catch {
        seekingRef.current = false;
      }
      if (supportsRVFC) {
        video.requestVideoFrameCallback(onPresented);
      }
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * EASE;

      if (duration > 0 && video && !seekingRef.current) {
        // Map progress -> exact frame time (snap to frame boundary).
        const exact = currentRef.current * duration;
        let t = Math.round(exact / frameDur) * frameDur;
        t = Math.min(duration, Math.max(0, t));

        const frameIdx = Math.round(t * fps);
        if (frameIdx !== lastSeekRef.current) {
          issueSeek(t, frameIdx);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onPresented);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, duration, trackRef, fps, frameDur, supportsRVFC]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark gradient placeholder — always visible (LCP fix, no black flash). */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

      {mounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            // Tiny scale hides stabilization edge-shift without distorting motion.
            transform: 'scale(1.04)',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
          muted
          playsInline
          preload="auto"
          // Intentionally: no autoPlay, no loop — scroll scrubs the flight.
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Cinematic overlays for depth + hero-text legibility. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.32)_100%)]" />
    </div>
  );
}