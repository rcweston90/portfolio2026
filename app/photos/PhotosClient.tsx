'use client';

import { useState, useEffect } from 'react';
import { PhotoCollage, ImageModal, Photo } from '@/core/composites/PhotoCollage';

export default function PhotosClient() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        }
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const handlePhotoClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen -mt-20 flex items-center justify-center">
        <p className="text-[var(--foreground-muted)] font-mono">Loading photos...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="w-full min-h-screen -mt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--foreground-muted)] font-mono mb-2">No photos yet</p>
          <p className="text-sm text-[var(--foreground-muted)] font-mono">
            Upload images via the admin panel to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Full-width container - wall-to-wall layout */}
      <div className="w-full min-h-screen -mt-20">
        <PhotoCollage
          photos={photos}
          onPhotoClick={handlePhotoClick}
          className=""
        />
      </div>

      {/* Image Modal */}
      <ImageModal
        photos={photos}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
}

