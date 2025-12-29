/**
 * Text Component Types
 */

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface AnimatedTextProps {
  /**
   * The text content to animate
   */
  text: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * HTML element to render as
   * @default 'h1'
   */
  as?: TextElement;
}

