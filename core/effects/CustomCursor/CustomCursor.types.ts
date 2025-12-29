/**
 * CustomCursor Component Types
 */

export interface CustomCursorProps {
  /**
   * Size of the inner dot in pixels
   * @default 12
   */
  dotSize?: number;
  
  /**
   * Size of the outer ring in pixels
   * @default 40
   */
  ringSize?: number;
  
  /**
   * Whether to use mix-blend-difference effect
   * @default true
   */
  blendMode?: boolean;
  
  /**
   * Additional CSS classes for the dot
   */
  dotClassName?: string;
  
  /**
   * Additional CSS classes for the ring
   */
  ringClassName?: string;
}

