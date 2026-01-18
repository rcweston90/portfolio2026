/**
 * Photo Collage Component Types
 */

export interface Photo {
  /**
   * Image source URL (relative to public directory)
   */
  src: string;
  
  /**
   * Alt text for accessibility
   */
  alt: string;
  
  /**
   * Optional width for image optimization
   */
  width?: number;
  
  /**
   * Optional height for image optimization
   */
  height?: number;
}

export interface PhotoCollageProps {
  /**
   * Array of photos to display
   */
  photos: Photo[];
  
  /**
   * Callback when a photo is clicked
   */
  onPhotoClick?: (index: number) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ImageModalProps {
  /**
   * Array of photos
   */
  photos: Photo[];
  
  /**
   * Currently selected photo index
   */
  currentIndex: number;
  
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback to close the modal
   */
  onClose: () => void;
  
  /**
   * Callback to navigate to next photo
   */
  onNext: () => void;
  
  /**
   * Callback to navigate to previous photo
   */
  onPrevious: () => void;
}

