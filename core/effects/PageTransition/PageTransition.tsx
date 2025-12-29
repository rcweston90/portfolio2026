'use client';

import { motion } from 'framer-motion';
import { PageTransitionProps } from './PageTransition.types';

/**
 * PageTransition Component
 * 
 * Wraps content with fade and slide animation for page transitions.
 * Works with AnimatePresence for exit animations.
 * 
 * @example
 * ```tsx
 * <AnimatePresence mode="wait">
 *   <PageTransition key={pathname}>
 *     {children}
 *   </PageTransition>
 * </AnimatePresence>
 * ```
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;

