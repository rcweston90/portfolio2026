'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProps, NavItem } from './Navigation.types';

const defaultNavItems: NavItem[] = [
  { name: 'Work', href: '/work' },
  { name: 'Fun', href: '/fun' },
  { name: 'About', href: '/about' },
  { name: 'Resume', href: '/resume' },
  { name: 'Blog', href: '/blog' },
];

/**
 * Navigation Component
 * 
 * A responsive navigation header with desktop and mobile variants.
 * Features glass-morphism effect on scroll and active link indicators.
 * 
 * @example
 * ```tsx
 * // In your layout
 * <Navigation />
 * 
 * // With custom items
 * <Navigation 
 *   items={[
 *     { name: 'Home', href: '/' },
 *     { name: 'About', href: '/about' },
 *   ]}
 *   logo="My Site"
 * />
 * ```
 */
export function Navigation({
  items = defaultNavItems,
  logo = 'RCWESTON',
  logoHref = '/',
  className = '',
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300
          ${isScrolled ? 'glass py-3' : 'py-5 bg-transparent'}
          ${className}
        `}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={logoHref}
            className="font-mono text-xl font-semibold text-[var(--foreground)] hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider"
          >
            [{logo}]
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    relative text-xs font-medium transition-colors duration-200 uppercase tracking-wider
                    ${isActiveLink(item.href)
                      ? 'text-[var(--accent-primary)]'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }
                  `}
                >
                  {item.name}
                  {isActiveLink(item.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-[var(--card-bg)] border-l border-[var(--border)] p-6 pt-20"
            >
              <ul className="flex flex-col gap-4">
                {items.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        block text-sm font-medium py-2 transition-colors uppercase tracking-wider
                        ${isActiveLink(item.href)
                          ? 'text-[var(--accent-primary)]'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;

