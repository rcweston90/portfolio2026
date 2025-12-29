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
  background: {
    primary: '#faf9f7',
    secondary: '#f1f0ee',
  },
  foreground: {
    primary: '#1e293b',
    muted: '#64748b',
  },
  accent: {
    primary: '#2563eb',
    secondary: '#ea580c',
    glow: 'rgba(37, 99, 235, 0.1)',
  },
  border: {
    default: '#cbd5e1',
    hover: '#94a3b8',
  },
  card: {
    background: '#ffffff',
    backgroundHover: '#f8fafc',
  },
  gradient: {
    start: '#2563eb',
    end: '#ea580c',
  },
} as const;

export type ColorToken = typeof colors;
export type RawColorToken = typeof rawColors;

