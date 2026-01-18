'use client';

import { motion, Variants } from 'framer-motion';
import { TimelineProps, TimelineItem } from './Timeline.types';
import { duration, easing } from '@/core/tokens/animations';

/**
 * Timeline Component
 * 
 * A vertical timeline component that displays career milestones, education, and projects
 * with smooth scroll-triggered animations and visual effects.
 * 
 * @example
 * ```tsx
 * <Timeline items={timelineData} />
 * ```
 */
export function Timeline({ items, className = '' }: TimelineProps) {
  // Sort items by date (newest first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: duration.slow,
        ease: easing.easeOut,
      },
    },
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    // Check if it's a full date or just year-month
    if (dateString.includes('-') && dateString.split('-').length === 3) {
      const day = date.getDate();
      return `${month} ${day}, ${year}`;
    }
    return `${month} ${year}`;
  };

  const getDotColor = (item: TimelineItem): string => {
    if (item.color === 'secondary') {
      return 'bg-[var(--accent-secondary)] border-[var(--accent-secondary)]';
    }
    return 'bg-[var(--accent-primary)] border-[var(--accent-primary)]';
  };

  const getLineColor = (item: TimelineItem): string => {
    if (item.color === 'secondary') {
      return 'border-[var(--accent-secondary)]';
    }
    return 'border-[var(--accent-primary)]';
  };

  const getIcon = (item: TimelineItem): string => {
    if (item.icon) return item.icon;
    
    switch (item.type) {
      case 'career':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '●';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`relative ${className}`}
    >
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border)] md:left-8" />
      
      <div className="space-y-12 md:space-y-16">
        {sortedItems.map((item, index) => (
          <motion.div
            key={`${item.date}-${item.title}-${index}`}
            variants={itemVariants}
            className="relative pl-12 md:pl-16"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                delay: index * 0.1 + 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className={`
                absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full 
                border-2 ${getDotColor(item)}
                shadow-lg z-10
                flex items-center justify-center
                group-hover:scale-125 transition-transform duration-300
              `}
            >
              <span className="text-[8px] leading-none">{getIcon(item)}</span>
            </motion.div>

            {/* Connecting line segment */}
            {index < sortedItems.length - 1 && (
              <div 
                className={`
                  absolute left-[17px] md:left-[25px] top-6 w-0.5 h-12 md:h-16
                  bg-[var(--border)]
                `}
              />
            )}

            {/* Timeline card */}
            <motion.div
              whileHover={{ 
                x: 8,
                transition: { duration: duration.fast }
              }}
              className="group"
            >
              <div
                className={`
                  relative p-6 md:p-8 rounded-sm
                  bg-[var(--card-bg)] border border-[var(--border)]
                  hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-md)]
                  transition-all duration-300 ease-out
                  shadow-[var(--shadow-sm)]
                `}
              >
                {/* Date badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`
                    font-mono text-xs md:text-sm font-semibold
                    px-3 py-1 rounded-sm
                    ${item.color === 'secondary' 
                      ? 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/20' 
                      : 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20'
                    }
                    uppercase tracking-wider
                  `}>
                    {formatDate(item.date)}
                  </span>
                  <span className={`
                    font-mono text-xs uppercase tracking-wider
                    ${item.color === 'secondary' 
                      ? 'text-[var(--accent-secondary)]' 
                      : 'text-[var(--accent-primary)]'
                    }
                  `}>
                    {item.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-mono text-lg md:text-xl font-bold text-[var(--foreground)] mb-2 uppercase tracking-wide">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="text-base md:text-lg font-medium text-[var(--accent-primary)] mb-3">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]"
                      >
                        <span className={`
                          mt-1 font-mono text-xs
                          ${item.color === 'secondary' 
                            ? 'text-[var(--accent-secondary)]' 
                            : 'text-[var(--accent-primary)]'
                          }
                        `}>
                          →
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional link */}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-4 inline-flex items-center gap-2
                      text-sm font-medium
                      text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]
                      transition-colors uppercase tracking-wider
                      group/link
                    "
                  >
                    <span>Learn more</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Timeline;

