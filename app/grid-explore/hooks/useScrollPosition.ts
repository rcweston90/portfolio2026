import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
  scrollPercentage: number;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    scrollPercentage: 0,
  });

  useEffect(() => {
    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = documentHeight > 0 ? scrollY / documentHeight : 0;

      setScrollPosition({
        x: scrollX,
        y: scrollY,
        scrollPercentage,
      });
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    updateScrollPosition(); // Initial call

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  return scrollPosition;
}

