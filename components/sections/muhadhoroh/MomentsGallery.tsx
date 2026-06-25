'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Loader2 } from 'lucide-react';
import { useGallery } from '@/lib/hooks/useGallery';

export default function MomentsGallery() {
  const { photos, loading, error } = useGallery({ eventName: 'Muhadhoroh Kubro' });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsAutoPlaying(true);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  // Auto-play in lightbox
  useEffect(() => {
    if (isAutoPlaying && selectedIndex !== null) {
      autoPlayRef.current = setInterval(() => {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, selectedIndex, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  // Loading state
  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-white/60 mb-4" />
          <p className="text-white/60 font-body">Loading gallery...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60 font-body">Failed to load gallery.</p>
        </div>
      </section>
    );
  }

  if (photos.length === 0) return null;

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-body mb-6">
            <Camera className="w-4 h-4" />
            MOMENTS
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            Muhadhoroh Kubro <span className="italic text-white/60">Moments</span>
          </h2>
          <p className="text-lg text-white/60 font-body max-w-2xl mx-auto">
            Capturing unforgettable moments from our spectacular annual performances
          </p>
        </motion.div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Large featured image */}
          {photos.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => openLightbox(1)}
            >
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                width={800}
                height={600}
                unoptimized
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-display text-lg">{photos[1].caption}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Regular images */}
          {photos.filter((_, i) => i !== 1).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? 'col-span-1' : ''
              } ${
                index === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
              onClick={() => openLightbox(index < 1 ? index : index + 1)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-display text-sm">{photo.caption}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-body text-sm hover:scale-105 transition-transform"
          >
            <Camera className="w-4 h-4" />
            View All Moments
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                width={1200}
                height={800}
                unoptimized
                loading="eager"
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-display text-lg">{photos[selectedIndex].caption}</p>
                <p className="text-white/60 text-sm font-body mt-1">
                  {selectedIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>

            {/* Auto-play toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full text-sm font-body transition-colors ${
                isAutoPlaying
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isAutoPlaying ? 'Pause' : 'Auto Play'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
