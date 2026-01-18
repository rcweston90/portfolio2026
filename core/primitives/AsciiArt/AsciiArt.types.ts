/**
 * AsciiArt Component Types
 */

export type AsciiArtColor = 'muted' | 'primary' | 'secondary' | 'foreground';
export type AsciiArtSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AsciiArtProps {
  /**
   * The ASCII art text to display
   */
  art: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Color variant
   * @default 'muted'
   */
  color?: AsciiArtColor;

  /**
   * Size variant
   * @default 'md'
   */
  size?: AsciiArtSize;

  /**
   * Whether to animate on mount
   * @default false
   */
  animate?: boolean;

  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number;
}

