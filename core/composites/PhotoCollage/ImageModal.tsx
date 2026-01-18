'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { ImageModalProps } from './PhotoCollage.types';

/**
 * ImageModal Component
 * 
 * Full-screen image viewer with navigation controls for viewing photos in detail.
 * Supports keyboard navigation (ESC to close, arrow keys to navigate).
 * 
 * @example
 * ```tsx
 * <ImageModal
 *   photos={photos}
 *   currentIndex={selectedIndex}
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onNext={() => setSelectedIndex((i) => (i + 1) % photos.length)}
 *   onPrevious={() => setSelectedIndex((i) => (i - 1 + photos.length) % photos.length)}
 * />
 * ```
 */
export function ImageModal({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageModalProps) {
  const currentPhoto = photos[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full"
                aria-label="Previous image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full"
                aria-label="Next image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/50 text-white/80 text-sm rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          )}

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;

