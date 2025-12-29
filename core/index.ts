/**
 * Core Component Library
 * 
 * A collection of reusable UI components, hooks, and design tokens
 * designed for consistency and easy integration with Storybook.
 * 
 * @packageDocumentation
 */

// Design Tokens
export * from './tokens';

// Hooks
export * from './hooks';

// Primitives - Basic building blocks
export {
  Button,
  AnimatedText,
  Tag,
  SocialLink,
  SectionHeader,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type AnimatedTextProps,
  type TextElement,
  type TagProps,
  type TagVariant,
  type TagSize,
  type SocialLinkProps,
  type SocialPlatform,
  type SectionHeaderProps,
  type SectionHeaderAlign,
} from './primitives';

// Composites - Complex components built from primitives
export {
  ProjectCard,
  PhotoGrid,
  type ProjectCardProps,
  type PhotoGridProps,
  type Photo,
} from './composites';

// Layout - Page structure components
export {
  Navigation,
  Footer,
  type NavigationProps,
  type NavItem,
  type FooterProps,
  type FooterSocialLink,
} from './layout';

// Feedback - User feedback components
export {
  LoadingScreen,
  type LoadingScreenProps,
} from './feedback';

// Effects - Visual effects & animations
export {
  PageTransition,
  ScrollProgress,
  CustomCursor,
  type PageTransitionProps,
  type ScrollProgressProps,
  type CustomCursorProps,
} from './effects';
