'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { CustomCursorProps } from './CustomCursor.types';

/**
 * CustomCursor Component
 * 
 * Displays a custom cursor that follows the mouse with a spring animation.
 * Shows a dot with an outer ring that reacts to interactive elements.
 * Automatically hides on touch devices.
 * 
 * @example
 * ```tsx
 * // In your layout
 * <CustomCursor />
 * 
 * // With custom sizes
 * <CustomCursor dotSize={8} ringSize={32} />
 * ```
 */
export function CustomCursor({
  dotSize = 12,
  ringSize = 40,
  blendMode = true,
  dotClassName = '',
  ringClassName = '',
}: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`
          fixed top-0 left-0 
          bg-[var(--accent-primary)] rounded-full 
          pointer-events-none z-[9999] 
          hidden md:block
          ${blendMode ? 'mix-blend-difference' : ''}
          ${dotClassName}
        `}
        style={{
          width: dotSize,
          height: dotSize,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className={`
          fixed top-0 left-0 
          border-2 border-[var(--accent-primary)] rounded-full 
          pointer-events-none z-[9998] 
          hidden md:block
          ${ringClassName}
        `}
        style={{
          width: ringSize,
          height: ringSize,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.5 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'var(--accent-primary)' : 'var(--accent-secondary)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

export default CustomCursor;

