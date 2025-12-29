'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ScrollProgressProps } from './ScrollProgress.types';

/**
 * ScrollProgress Component
 * 
 * Displays a progress bar at the top of the viewport that indicates
 * how far the user has scrolled down the page.
 * 
 * @example
 * ```tsx
 * // In your layout
 * <ScrollProgress />
 * 
 * // With custom height
 * <ScrollProgress height="2px" />
 * ```
 */
export function ScrollProgress({ height = '4px', className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`
        fixed top-0 left-0 right-0 
        bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] 
        origin-left z-[100]
        ${className}
      `}
      style={{ 
        scaleX,
        height,
      }}
    />
  );
}

export default ScrollProgress;

