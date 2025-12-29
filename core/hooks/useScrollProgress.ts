'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollProgressOptions {
  /** Element to track scroll on (defaults to document) */
  element?: HTMLElement | null;
  /** Throttle delay in ms */
  throttle?: number;
}

interface ScrollProgressResult {
  /** Scroll progress from 0 to 1 */
  progress: number;
  /** Whether user is currently scrolling */
  isScrolling: boolean;
  /** Scroll direction: 'up', 'down', or null */
  direction: 'up' | 'down' | null;
  /** Current scroll position in pixels */
  scrollY: number;
}

/**
 * Hook to track scroll progress
 * 
 * @param options - Configuration options
 * @returns Scroll progress information
 * 
 * @example
 * ```tsx
 * const { progress, direction, isScrolling } = useScrollProgress();
 * 
 * return (
 *   <div style={{ transform: `scaleX(${progress})` }} />
 * );
 * ```
 */
export function useScrollProgress(options: ScrollProgressOptions = {}): ScrollProgressResult {
  const { element = null, throttle: throttleMs = 16 } = options;

  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const calculateProgress = useCallback(() => {
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const maxScroll = scrollHeight - clientHeight;
      return maxScroll > 0 ? scrollTop / maxScroll : 0;
    } else {
      const { scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      return maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }
  }, [element]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      
      if (now - lastTime >= throttleMs) {
        lastTime = now;
        
        const currentScrollY = element ? element.scrollTop : window.scrollY;
        const newProgress = calculateProgress();
        
        setProgress(newProgress);
        setScrollY(currentScrollY);
        setIsScrolling(true);
        setDirection(currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : null);
        setLastScrollY(currentScrollY);
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          setDirection(null);
        }, 150);
      }
    };

    const target = element || window;
    target.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation
    setProgress(calculateProgress());
    setScrollY(element ? element.scrollTop : window.scrollY);

    return () => {
      target.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [element, throttleMs, calculateProgress, lastScrollY]);

  return { progress, isScrolling, direction, scrollY };
}

/**
 * Hook to detect if user has scrolled past a threshold
 * 
 * @param threshold - Scroll threshold in pixels
 * @returns Boolean indicating if scrolled past threshold
 */
export function useScrolledPast(threshold: number): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPast(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isPast;
}

