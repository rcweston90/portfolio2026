/**
 * Design Tokens
 * 
 * Centralized design tokens for the component library.
 * These tokens ensure consistency across all components.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './animations';

// Re-export all tokens as a single object for convenience
import { colors, rawColors } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } from './typography';
import { spacing, borderRadius, breakpoints, containerMaxWidth, zIndex } from './spacing';
import { easing, duration, springs, variants } from './animations';

export const tokens = {
  colors,
  rawColors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  spacing,
  borderRadius,
  breakpoints,
  containerMaxWidth,
  zIndex,
  easing,
  duration,
  springs,
  variants,
} as const;

export type Tokens = typeof tokens;

