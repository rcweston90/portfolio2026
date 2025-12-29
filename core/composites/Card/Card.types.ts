/**
 * Card Component Types
 */

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
   */
  featured?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

