'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FooterProps, FooterSocialLink } from './Footer.types';

const defaultSocialLinks: FooterSocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/richardcharlieweston',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/rcweston90',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/rcweston',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:charlie.rcweston@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

/**
 * Footer Component
 * 
 * Site footer with social links and copyright information.
 * 
 * @example
 * ```tsx
 * // In your layout
 * <Footer />
 * 
 * // With custom links
 * <Footer 
 *   socialLinks={customLinks}
 *   copyrightText="Designed & Built with love"
 * />
 * ```
 */
export function Footer({
  socialLinks = defaultSocialLinks,
  copyrightText = '© 2024 – Charlie Weston',
  className = '',
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isEmailMenuOpen, setIsEmailMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailMenuRef = useRef<HTMLDivElement>(null);

  // Extract email address from social links
  const emailLink = socialLinks.find(link => link.href.startsWith('mailto:'));
  const emailAddress = emailLink?.href.replace('mailto:', '') || '';

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailMenuRef.current && !emailMenuRef.current.contains(event.target as Node)) {
        setIsEmailMenuOpen(false);
      }
    };

    if (isEmailMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmailMenuOpen]);

  // Copy to clipboard function
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Open email client
  const handleOpenEmail = () => {
    window.location.href = `mailto:${emailAddress}`;
    setIsEmailMenuOpen(false);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`border-t border-[var(--border)] mt-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const isExternal = (link.href.startsWith('http://') || link.href.startsWith('https://')) && !link.href.startsWith('mailto:');
              const isEmail = link.href.startsWith('mailto:');
              
              // Email link with dropdown menu
              if (isEmail) {
                return (
                  <div key={link.name} className="relative" ref={emailMenuRef}>
                    <motion.button
                      onClick={() => setIsEmailMenuOpen(!isEmailMenuOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-sm bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--card-bg-hover)] border border-[var(--border)] transition-colors"
                      aria-label={link.name}
                      aria-expanded={isEmailMenuOpen}
                    >
                      {link.icon}
                    </motion.button>

                    {/* Email Dropdown Menu */}
                    <AnimatePresence>
                      {isEmailMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute bottom-full left-0 mb-2 w-64 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-lg overflow-hidden z-50"
                        >
                          {/* Email Address Display */}
                          <div className="px-4 py-3 border-b border-[var(--border)]">
                            <p className="text-sm text-[var(--foreground-muted)] font-mono">
                              {emailAddress}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="p-2 space-y-1">
                            <motion.button
                              onClick={handleCopyEmail}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-4 py-2 text-sm text-left text-[var(--foreground)] hover:bg-[var(--card-bg-hover)] rounded-sm transition-colors flex items-center gap-2"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                {copied ? (
                                  <path d="M20 6L9 17l-5-5" />
                                ) : (
                                  <>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                  </>
                                )}
                              </svg>
                              <span>{copied ? 'Copied!' : 'Copy to clipboard'}</span>
                            </motion.button>

                            <motion.button
                              onClick={handleOpenEmail}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-4 py-2 text-sm text-left text-[var(--foreground)] hover:bg-[var(--card-bg-hover)] rounded-sm transition-colors flex items-center gap-2"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                              <span>Open email client</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Regular external links
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-sm bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--card-bg-hover)] border border-[var(--border)] transition-colors"
                  aria-label={link.name}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  {link.icon}
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--foreground-muted)] font-mono uppercase tracking-wider">
            {copyrightText}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
