/**
 * Navigation Component Types
 */

export interface NavItem {
  /**
   * Display name
   */
  name: string;
  
  /**
   * Link href
   */
  href: string;
}

export interface NavigationProps {
  /**
   * Navigation items to display
   */
  items?: NavItem[];
  
  /**
   * Logo text or element
   * @default 'Portfolio'
   */
  logo?: string;
  
  /**
   * Logo link href
   * @default '/'
   */
  logoHref?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

