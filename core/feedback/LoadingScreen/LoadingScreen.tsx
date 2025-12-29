'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LoadingScreenProps } from './LoadingScreen.types';

/**
 * LoadingScreen Component
 * 
 * Displays a full-screen loading overlay with animated text and progress bar.
 * Automatically dismisses after the specified duration.
 * 
 * @example
 * ```tsx
 * // In your layout
 * <LoadingScreen />
 * 
 * // With custom settings
 * <LoadingScreen 
 *   text="Loading..." 
 *   duration={2000}
 *   onLoadingComplete={() => console.log('Ready!')}
 * />
 * ```
 */
export function LoadingScreen({
  text = 'Portfolio',
  duration = 1500,
  onLoadingComplete,
  className = '',
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`
            fixed inset-0 z-[9999] 
            flex items-center justify-center 
            bg-[var(--background)]
            ${className}
          `}
        >
          <div className="text-center">
            {/* Animated Logo/Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.span
                className="font-serif text-4xl md:text-5xl font-bold text-gradient"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {text}
              </motion.span>
            </motion.div>

            {/* Loading bar */}
            <div className="mt-8 w-48 h-1 bg-[var(--border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000 * 0.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;

