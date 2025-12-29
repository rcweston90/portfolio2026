/**
 * SocialLink Component Types
 */

import { ReactNode } from 'react';

export type SocialPlatform = 'linkedin' | 'github' | 'twitter' | 'email' | 'website' | 'custom';

export interface SocialLinkProps {
  /**
   * The URL or mailto link
   */
  href: string;
  
  /**
   * Platform type (affects styling and default icon)
   * @default 'custom'
   */
  platform?: SocialPlatform;
  
  /**
   * Custom icon to display (overrides platform default)
   */
  icon?: ReactNode;
  
  /**
   * Accessible label for the link
   */
  label: string;
  
  /**
   * Whether to show label text alongside icon
   * @default false
   */
  showLabel?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

