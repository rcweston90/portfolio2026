/**
 * PhotoGrid Component Types
 */

export interface Photo {
  /**
   * Image source URL
   */
  src: string;
  
  /**
   * Alt text for accessibility
   */
  alt: string;
}

export interface PhotoGridProps {
  /**
   * Array of photos to display (max 6)
   */
  photos: Photo[];
  
  /**
   * Maximum number of photos to show
   * @default 6
   */
  maxPhotos?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

