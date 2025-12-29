import { SVGProps } from 'react';

export type IconName = 
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'menu'
  | 'close'
  | 'external-link'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'chevron-down';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** The name of the icon to render */
  name: IconName;
  /** Size of the icon */
  size?: IconSize;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for the icon */
  'aria-label'?: string;
}

