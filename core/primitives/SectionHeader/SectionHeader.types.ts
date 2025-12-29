/**
 * SectionHeader Component Types
 */

import { ReactNode } from 'react';

export type SectionHeaderAlign = 'left' | 'center' | 'right';

export interface SectionHeaderProps {
  /**
   * Main title text
   */
  title: string;
  
  /**
   * Optional subtitle/description
   */
  subtitle?: string;
  
  /**
   * Text alignment
   * @default 'left'
   */
  align?: SectionHeaderAlign;
  
  /**
   * Optional action element (e.g., "View All" link)
   */
  action?: ReactNode;
  
  /**
   * Whether to animate the header
   * @default true
   */
  animated?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

