'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PhotoGridProps } from './PhotoGrid.types';

// Polaroid-style scattered positions
const positions = [
  { rotate: -6, x: 0, y: 0, scale: 1 },
  { rotate: 4, x: 10, y: -20, scale: 0.95 },
  { rotate: -3, x: -5, y: 15, scale: 1.05 },
  { rotate: 8, x: 15, y: 5, scale: 0.9 },
  { rotate: -5, x: -10, y: -10, scale: 1 },
  { rotate: 2, x: 5, y: 10, scale: 0.95 },
];

/**
 * PhotoGrid Component
 * 
 * Displays photos in a scattered polaroid-style grid layout.
 * Each photo has a unique rotation and hover effect.
 * 
 * @example
 * ```tsx
 * <PhotoGrid 
 *   photos={[
 *     { src: '/image1.jpg', alt: 'Description 1' },
 *     { src: '/image2.jpg', alt: 'Description 2' },
 *   ]}
 * />
 * ```
 */
export function PhotoGrid({ photos, maxPhotos = 6, className = '' }: PhotoGridProps) {
  const displayPhotos = photos.slice(0, maxPhotos);

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {displayPhotos.map((photo, index) => {
          const pos = positions[index % positions.length];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotate: pos.rotate,
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              viewport={{ once: true }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
              style={{
                transformOrigin: 'center center',
              }}
              className="relative group cursor-pointer"
            >
              {/* Polaroid frame */}
              <div className="bg-[var(--foreground)] p-2 pb-8 rounded shadow-lg transition-shadow group-hover:shadow-xl group-hover:shadow-[var(--accent-glow)]">
                <div className="relative aspect-square overflow-hidden">
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/30 to-[var(--accent-secondary)]/30 flex items-center justify-center">
                      <span className="text-4xl opacity-50">📸</span>
                    </div>
                  )}
                </div>
                
                {/* Polaroid caption area */}
                <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-[var(--background)] font-medium truncate px-2">
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PhotoGrid;

