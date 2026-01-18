'use client';

import { motion } from 'framer-motion';

interface ViewToggleProps {
  viewMode: 'timeline' | 'gantt';
  onViewChange: (mode: 'timeline' | 'gantt') => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 rounded-sm bg-[var(--background-secondary)] border border-[var(--border)]">
      <motion.button
        onClick={() => onViewChange('timeline')}
        className={`
          px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors
          ${viewMode === 'timeline'
            ? 'bg-[var(--accent-primary)] text-white'
            : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Timeline
      </motion.button>
      <motion.button
        onClick={() => onViewChange('gantt')}
        className={`
          px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors
          ${viewMode === 'gantt'
            ? 'bg-[var(--accent-primary)] text-white'
            : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Gantt
      </motion.button>
    </div>
  );
}

