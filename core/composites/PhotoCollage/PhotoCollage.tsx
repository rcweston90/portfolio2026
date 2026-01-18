'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PhotoCollageProps } from './PhotoCollage.types';

/**
 * PhotoCollage Component
 * 
 * Displays photos in a masonry-style layout that spans the full width of the browser.
 * Images are cropped/masked to maintain aspect ratios while filling their containers.
 * 
 * @example
 * ```tsx
 * <PhotoCollage 
 *   photos={[
 *     { src: '/images/photos/photo-1.jpg', alt: 'Description 1' },
 *     { src: '/images/photos/photo-2.jpg', alt: 'Description 2' },
 *   ]}
 *   onPhotoClick={(index) => handlePhotoClick(index)}
 * />
 * ```
 */
export function PhotoCollage({ photos, onPhotoClick, className = '' }: PhotoCollageProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative w-full aspect-square group cursor-pointer"
            onClick={() => onPhotoClick?.(index)}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-125"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < 9 ? 'eager' : 'lazy'}
                fill
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PhotoCollage;

