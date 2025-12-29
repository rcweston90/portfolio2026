'use client';

import { motion } from 'framer-motion';
import { SectionHeaderProps } from './SectionHeader.types';

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * SectionHeader Component
 * 
 * A reusable section heading with title, optional subtitle, and action slot.
 * Commonly used at the top of content sections.
 * 
 * @example
 * ```tsx
 * <SectionHeader 
 *   title="Featured Work" 
 *   subtitle="Selected projects I'm proud of"
 *   action={<Link href="/work">View All</Link>}
 * />
 * 
 * <SectionHeader 
 *   title="What I Do" 
 *   subtitle="Bridging design and development"
 *   align="center"
 * />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  action,
  animated = true,
  className = '',
}: SectionHeaderProps) {
  const Wrapper = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
      }
    : {};

  return (
    <Wrapper
      {...animationProps}
      className={`
        ${action ? 'flex items-end justify-between gap-4' : ''}
        ${alignStyles[align]}
        ${className}
      `}
    >
      <div className={action ? '' : 'w-full'}>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[var(--foreground-muted)]">
            {subtitle}
          </p>
        )}
      </div>
      
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </Wrapper>
  );
}

export default SectionHeader;

