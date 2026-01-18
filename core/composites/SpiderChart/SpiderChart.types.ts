/**
 * SpiderChart Component Types
 */

export interface Skill {
  /**
   * Skill name
   */
  name: string;
  
  /**
   * Skill value (0-100)
   */
  value: number;
}

export interface SpiderChartProps {
  /**
   * Array of skills to display
   */
  skills: Skill[];
  
  /**
   * Size of the chart (width and height)
   * @default 120
   */
  size?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Whether to show skill labels
   * @default true
   */
  showLabels?: boolean;
}

