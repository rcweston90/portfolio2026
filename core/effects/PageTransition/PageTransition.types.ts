/**
 * PageTransition Component Types
 */

import { ReactNode } from 'react';

export interface PageTransitionProps {
  /**
   * Content to wrap with transition animation
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

