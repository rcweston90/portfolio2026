/**
 * Footer Component Types
 */

import { ReactNode } from 'react';

export interface FooterSocialLink {
  /**
   * Platform name for aria-label
   */
  name: string;
  
  /**
   * Link href
   */
  href: string;
  
  /**
   * Icon element
   */
  icon: ReactNode;
}

export interface FooterProps {
  /**
   * Social links to display
   */
  socialLinks?: FooterSocialLink[];
  
  /**
   * Copyright text (year is added automatically)
   */
  copyrightText?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

