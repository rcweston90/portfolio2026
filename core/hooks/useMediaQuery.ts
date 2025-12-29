'use client';

import { useState, useEffect } from 'react';
import { breakpoints } from '../tokens/spacing';

/**
 * Hook to detect if a media query matches
 * 
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Hook to detect if viewport is mobile size
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.md})`);
}

/**
 * Hook to detect if viewport is tablet size
 */
export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`);
}

/**
 * Hook to detect if viewport is desktop size
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.lg})`);
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Hook to detect if device supports hover
 */
export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover)');
}

/**
 * Hook to detect if device is touch-based
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

