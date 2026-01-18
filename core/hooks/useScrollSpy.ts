'use client';

import { useState, useEffect, RefObject } from 'react';

interface UseScrollSpyOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollSpy(
  refs: RefObject<HTMLElement>[],
  options: UseScrollSpyOptions = {}
): number {
  const { threshold = 0.3, rootMargin = '-20% 0px -70% 0px' } = options;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (refs.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const observerOptions = {
      threshold,
      rootMargin,
    };

    // Track intersection ratios to determine most visible section
    const intersectionRatios = new Map<number, number>();

    const handleIntersect = (index: number) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        intersectionRatios.set(index, entry.intersectionRatio);
        
        if (entry.isIntersecting) {
          // Find the section with the highest intersection ratio
          let maxRatio = 0;
          let maxIndex = index;
          
          intersectionRatios.forEach((ratio, idx) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxIndex = idx;
            }
          });
          
          setActiveIndex(maxIndex);
        }
      });
    };

    // Create observers for each ref
    refs.forEach((ref, index) => {
      if (ref.current) {
        const observer = new IntersectionObserver(handleIntersect(index), observerOptions);
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect());
      intersectionRatios.clear();
    };
  }, [refs.length, threshold, rootMargin]);

  return activeIndex;
}

