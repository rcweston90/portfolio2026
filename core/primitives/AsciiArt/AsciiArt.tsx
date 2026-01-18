'use client';

import { motion } from 'framer-motion';
import { AsciiArtProps } from './AsciiArt.types';

/**
 * AsciiArt Component
 * 
 * A component for rendering ASCII art with proper monospace styling.
 * Supports animations and theme-aware colors.
 * 
 * @example
 * ```tsx
 * <AsciiArt
 *   art={`
 *     ┌─────┐
 *     │Hello│
 *     └─────┘
 *   `}
 * />
 * ```
 */
export function AsciiArt({
  art,
  className = '',
  color = 'muted',
  size = 'md',
  animate = false,
  delay = 0,
}: AsciiArtProps) {
  const colorClasses = {
    muted: 'text-[var(--foreground-muted)]',
    primary: 'text-[var(--accent-primary)]',
    secondary: 'text-[var(--accent-secondary)]',
    foreground: 'text-[var(--foreground)]',
  };

  const sizeClasses = {
    xs: 'text-[8px] leading-[10px]',
    sm: 'text-[10px] leading-[12px]',
    md: 'text-xs leading-[14px] md:text-sm md:leading-[16px]',
    lg: 'text-sm leading-[16px] md:text-base md:leading-[18px]',
    xl: 'text-base leading-[18px] md:text-lg md:leading-[20px]',
  };

  const content = (
    <pre
      className={`
        font-mono
        ${sizeClasses[size]}
        ${colorClasses[color]}
        whitespace-pre
        overflow-x-auto
        ${className}
      `}
    >
      {art}
    </pre>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

export default AsciiArt;

