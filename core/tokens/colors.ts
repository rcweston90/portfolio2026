/**
 * Color Tokens
 * 
 * Design tokens for colors used throughout the application.
 * These map to CSS variables defined in globals.css.
 */

export const colors = {
  // Background colors
  background: {
    primary: 'var(--background)',
    secondary: 'var(--background-secondary)',
  },
  
  // Foreground/text colors
  foreground: {
    primary: 'var(--foreground)',
    muted: 'var(--foreground-muted)',
  },
  
  // Accent colors
  accent: {
    primary: 'var(--accent-primary)',
    secondary: 'var(--accent-secondary)',
    glow: 'var(--accent-glow)',
  },
  
  // Border colors
  border: {
    default: 'var(--border)',
    hover: 'var(--border-hover)',
  },
  
  // Card colors
  card: {
    background: 'var(--card-bg)',
    backgroundHover: 'var(--card-bg-hover)',
  },
  
  // Gradient colors
  gradient: {
    start: 'var(--gradient-start)',
    end: 'var(--gradient-end)',
  },
} as const;

/**
 * Raw color values (for use outside CSS context)
 */
export const rawColors = {
  // Palette colors
  blue: '#0055CC',
  teal: '#063D5B',
  grayDark: '#404040',
  grayMedium: '#555555',
  blueLight: '#E9F2FF',
  grayLight: '#F1F2F4',
  orangeLight: '#F6B058',
  orange: '#FA9619',
  beige: '#FCDEB9',
  white: '#FFFFFF',
  
  // Semantic colors - Light & minimal theme
  background: {
    primary: '#FFFFFF',
    secondary: '#F1F2F4',
  },
  foreground: {
    primary: '#404040',
    muted: '#555555',
  },
  accent: {
    primary: '#0055CC',
    secondary: '#FA9619',
    glow: 'rgba(0, 85, 204, 0.08)',
  },
  border: {
    default: '#F1F2F4',
    hover: '#E9F2FF',
  },
  card: {
    background: '#FFFFFF',
    backgroundHover: '#F1F2F4',
  },
  gradient: {
    start: '#0055CC',
    end: '#FA9619',
  },
} as const;

export type ColorToken = typeof colors;
export type RawColorToken = typeof rawColors;
