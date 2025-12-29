'use client';

import { motion, Variants } from 'framer-motion';
import { AnimatedTextProps } from './Text.types';

/**
 * AnimatedText Component
 * 
 * Displays text with a staggered word-by-word animation effect.
 * Each word animates in with a 3D rotation and fade effect.
 * 
 * @example
 * ```tsx
 * <AnimatedText 
 *   text="Hello World" 
 *   as="h1" 
 *   className="text-4xl font-bold"
 *   delay={0.2}
 * />
 * ```
 */
export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  as = 'h1' 
}: AnimatedTextProps) {
  const words = text.split(' ');
  const Tag = as;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-[0.25em]"
            style={{ perspective: '1000px' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default AnimatedText;

