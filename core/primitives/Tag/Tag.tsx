'use client';

import { motion } from 'framer-motion';
import { TagProps } from './Tag.types';

const variantStyles = {
  default: 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)]',
  outline: 'bg-transparent text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent-primary)]',
  solid: 'bg-[var(--accent-primary)] text-[var(--background)] border border-transparent',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

/**
 * Tag Component
 * 
 * A small label component for categorization, filtering, or displaying metadata.
 * 
 * @example
 * ```tsx
 * <Tag>React</Tag>
 * <Tag variant="solid">Featured</Tag>
 * <Tag removable onRemove={() => console.log('removed')}>Removable</Tag>
 * ```
 */
export function Tag({
  children,
  variant = 'default',
  size = 'sm',
  onClick,
  removable = false,
  onRemove,
  className = '',
}: TagProps) {
  const isInteractive = !!onClick;
  const Component = isInteractive ? motion.button : motion.span;

  return (
    <Component
      whileHover={isInteractive ? { scale: 1.05 } : undefined}
      whileTap={isInteractive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isInteractive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-1 hover:text-[var(--accent-primary)] transition-colors"
          aria-label="Remove"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
    </Component>
  );
}

export default Tag;

