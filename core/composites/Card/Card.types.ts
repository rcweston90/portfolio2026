/**
 * Card Component Types
 */

export type CardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

export interface ProjectCardProps {
  /**
   * Project title
   */
  title: string;
  
  /**
   * Project description
   */
  description: string;
  
  /**
   * Tags/technologies used
   */
  tags: string[];
  
  /**
   * Project image URL
   */
  image?: string;
  
  /**
   * Link to project detail page
   */
  href: string;
  
  /**
   * Whether to display as featured (larger card)
   * @default false
   * @deprecated Use `size` prop instead
   */
  featured?: boolean;
  
  /**
   * Card size for bento grid layout
   * - small: 1x1 grid cell
   * - medium: 1x1 grid cell (default)
   * - large: 2x2 grid cells
   * - wide: 2x1 grid cells
   * - tall: 1x2 grid cells
   * @default 'medium'
   */
  size?: CardSize;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

