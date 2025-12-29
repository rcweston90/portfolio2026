/**
 * Tag Component Types
 */

import { ReactNode } from 'react';

export type TagVariant = 'default' | 'outline' | 'solid';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  /**
   * Tag content (usually text)
   */
  children: ReactNode;
  
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: TagVariant;
  
  /**
   * Tag size
   * @default 'sm'
   */
  size?: TagSize;
  
  /**
   * Optional click handler (makes tag interactive)
   */
  onClick?: () => void;
  
  /**
   * Whether the tag is removable
   * @default false
   */
  removable?: boolean;
  
  /**
   * Handler for remove action
   */
  onRemove?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

