/**
 * Timeline Component Types
 */

export type TimelineItemType = 'career' | 'education' | 'project';

export type TimelineItemColor = 'primary' | 'secondary';

/**
 * Timeline item data structure
 */
export interface TimelineItem {
  /**
   * Type of timeline item
   */
  type: TimelineItemType;
  
  /**
   * Date string for sorting and display (format: YYYY-MM or YYYY-MM-DD)
   */
  date: string;
  
  /**
   * Main title (e.g., role, degree, project name)
   */
  title: string;
  
  /**
   * Subtitle (e.g., company, school, project category)
   */
  subtitle: string;
  
  /**
   * Description text
   */
  description: string;
  
  /**
   * Optional highlights/achievements (primarily for career items)
   */
  highlights?: string[];
  
  /**
   * Optional icon/emoji to display
   */
  icon?: string;
  
  /**
   * Accent color variant
   * @default 'primary'
   */
  color?: TimelineItemColor;
  
  /**
   * Optional link URL
   */
  url?: string;
}

/**
 * Timeline component props
 */
export interface TimelineProps {
  /**
   * Array of timeline items to display
   */
  items: TimelineItem[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

