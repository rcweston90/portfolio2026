'use client';

import { useState } from 'react';
import { PhotoCollage, ImageModal, Photo } from '@/core/composites/PhotoCollage';

/**
 * Placeholder photos using Picsum Photos service
 * All images have the same height for consistent layout
 */
const samplePhotos: Photo[] = [
  { src: 'https://picsum.photos/800/1000?random=1', alt: 'Photo 1', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=2', alt: 'Photo 2', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=3', alt: 'Photo 3', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=4', alt: 'Photo 4', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=5', alt: 'Photo 5', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=6', alt: 'Photo 6', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=7', alt: 'Photo 7', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=8', alt: 'Photo 8', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=9', alt: 'Photo 9', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=10', alt: 'Photo 10', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=11', alt: 'Photo 11', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=12', alt: 'Photo 12', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=13', alt: 'Photo 13', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=14', alt: 'Photo 14', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=15', alt: 'Photo 15', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=16', alt: 'Photo 16', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=17', alt: 'Photo 17', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=18', alt: 'Photo 18', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=19', alt: 'Photo 19', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=20', alt: 'Photo 20', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=21', alt: 'Photo 21', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=22', alt: 'Photo 22', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=23', alt: 'Photo 23', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=24', alt: 'Photo 24', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=25', alt: 'Photo 25', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=26', alt: 'Photo 26', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=27', alt: 'Photo 27', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=28', alt: 'Photo 28', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=29', alt: 'Photo 29', width: 800, height: 1000 },
  { src: 'https://picsum.photos/800/1000?random=30', alt: 'Photo 30', width: 800, height: 1000 },
];

export default function PhotosClient() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % samplePhotos.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + samplePhotos.length) % samplePhotos.length);
  };

  return (
    <>
      {/* Full-width container - wall-to-wall layout */}
      <div className="w-full min-h-screen -mt-20">
        <PhotoCollage
          photos={samplePhotos}
          onPhotoClick={handlePhotoClick}
          className=""
        />
      </div>

      {/* Image Modal */}
      <ImageModal
        photos={samplePhotos}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
}

