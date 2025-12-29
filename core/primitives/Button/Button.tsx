'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from './Button.types';

const variantStyles = {
  primary: 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--background)] hover:shadow-lg hover:shadow-[var(--accent-glow)]',
  secondary: 'bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]',
  ghost: 'bg-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]',
  link: 'bg-transparent text-[var(--accent-primary)] hover:underline p-0',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Includes hover animations and loading state support.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click Me
 * </Button>
 * 
 * <Button variant="secondary" leftIcon={<IconPlus />}>
 *   Add Item
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      leftIcon,
      rightIcon,
      isLoading = false,
      fullWidth = false,
      disabled = false,
      type = 'button',
      onClick,
      className = '',
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        whileHover={isDisabled ? undefined : { scale: 1.02, y: -2 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`
          inline-flex items-center justify-center gap-2 
          font-medium rounded-lg
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${variant !== 'link' ? sizeStyles[size] : ''}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={isDisabled}
      >
        {isLoading ? (
          <>
            <motion.span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
