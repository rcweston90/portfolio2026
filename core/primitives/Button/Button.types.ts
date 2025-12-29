/**
 * Button Component Types
 */

import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /**
   * Button visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Optional icon to display before text
   */
  leftIcon?: ReactNode;
  
  /**
   * Optional icon to display after text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether the button takes full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
