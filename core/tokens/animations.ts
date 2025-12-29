/**
 * Animation Tokens
 * 
 * Design tokens for animations and transitions used throughout the application.
 */

/**
 * Easing functions
 */
export const easing = {
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  // Custom easings
  smooth: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * Duration presets (in seconds for Framer Motion)
 */
export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1,
} as const;

/**
 * Spring configurations for Framer Motion
 */
export const springs = {
  // Gentle spring for subtle movements
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
  },
  // Default spring for most animations
  default: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
  // Snappy spring for quick interactions
  snappy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  // Bouncy spring for playful elements
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
  // Stiff spring for responsive feedback
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
  },
} as const;

/**
 * Common animation variants for Framer Motion
 */
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: duration.normal, ease: easing.easeOut },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: duration.normal, ease: easing.easeOut },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: duration.normal, ease: easing.easeOut },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const;

export type Easing = typeof easing;
export type Duration = typeof duration;
export type Spring = typeof springs;
export type Variants = typeof variants;

