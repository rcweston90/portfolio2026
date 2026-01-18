'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { TimelineItemProps } from './TimelineItem.types';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(({
  role,
  company,
  period,
  description,
  highlights,
  isNewCompany = false,
  isFirstInCompany = false,
  isLastInCompany = false,
  index,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={`
        relative
        bg-[var(--card-bg)]
        border border-[var(--border)]
        rounded-sm
        p-4 md:p-6
        shadow-[var(--shadow-sm)]
        hover:shadow-[var(--shadow-md)]
        hover:border-[var(--accent-primary)]
        transition-all duration-200
        ${isNewCompany ? 'mt-0' : 'mt-3 md:mt-4'}
      `}
    >
      {/* Timeline dot - different styles for new company vs promotion */}
      {isNewCompany ? (
        // Primary dot for new company - larger, filled
        <div className="absolute -left-[6px] top-6 w-4 h-4 rounded-full bg-[var(--accent-primary)] border-2 border-[var(--accent-primary)] z-10" />
      ) : (
        // Secondary dot for same-company role - smaller, outline
        <div className="absolute -left-[4px] top-6 w-2.5 h-2.5 rounded-full bg-[var(--background)] border-2 border-[var(--foreground-muted)]/40 z-10" />
      )}

      {/* Header Section */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-mono text-lg md:text-xl font-semibold text-[var(--foreground)] uppercase tracking-wide">
              {role}
            </h3>
          </div>
          <span className="text-xs md:text-sm text-[var(--accent-primary)] font-medium font-mono uppercase tracking-wider whitespace-nowrap">
            {period}
          </span>
        </div>
      </div>

      {/* Description Section */}
      <p className="text-sm text-[var(--foreground-muted)] mb-4 leading-relaxed">
        {description}
      </p>

      {/* Highlights Section */}
      {highlights.length > 0 && (
        <ul className="space-y-2">
          {highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--foreground-muted)]"
            >
              <span className="text-[var(--accent-primary)] mt-1 font-mono flex-shrink-0">→</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';

