'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AnimatedText } from '@/core/primitives';
import { HEADSHOT_IMAGE, HEADSHOT_ALT_IMAGE } from '@/lib/images';

const principles = [
  'The work always matters, but how people get work done matters more.',
  'Simplification is both the bedrock of innovation and its limiting factor.',
  'Launching and learning is the end-goal; don\'t get caught in an iterative loop.',
  'Momentum compounds in all directions.',
  'Data is your best defense when selling in abstract ideas; use it to influence minds.',
  'Give back as you climb; sharing experiences opens doors both ways.',
  'Excellence in craft demands holistic balance.',
  'A bad strategy is worse than no strategy; be purposeful in your intentions.',
];

const ANIMATION_DURATION = 1000; // ms
const ANIMATION_DELAYS = {
  avatar: 0.3,
  bio: 0.5,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomeClient() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentImage, setCurrentImage] = useState(HEADSHOT_IMAGE);
  const [showHoverButton, setShowHoverButton] = useState(false);

  const handleFlip = useCallback(() => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentImage((prev) => prev === HEADSHOT_IMAGE ? HEADSHOT_ALT_IMAGE : HEADSHOT_IMAGE);
      setIsFlipping(false);
    }, ANIMATION_DURATION);
  }, [isFlipping]);

  const handleMouseEnter = useCallback(() => setShowHoverButton(true), []);
  const handleMouseLeave = useCallback(() => setShowHoverButton(false), []);

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Main Intro - Full Width */}
      <section className="mb-20 pb-4 border-b border-[var(--border)] px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-4">
          <div className="flex-1 min-w-0">
            <AnimatedText
              text="Hello there, I'm Charlie Weston."
              as="h1"
              className="font-mono text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--foreground)] leading-tight uppercase tracking-tight"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: ANIMATION_DELAYS.avatar, duration: 0.5 }}
            className="flex-shrink-0 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-[120px] h-[120px]" style={{ perspective: '1000px' }}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] p-1 shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--background-secondary)] relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Coin flip container */}
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      rotateY: isFlipping ? 1800 : 0, // Multiple rotations for coin effect
                      rotateX: isFlipping ? [0, 90, 180, 270, 360] : 0,
                      scale: isFlipping ? [1, 0.7, 0.5, 0.7, 1] : 1,
                    }}
                    transition={{
                      duration: ANIMATION_DURATION / 1000,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={currentImage}
                      alt="Charlie Weston"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-full"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Hover button - appears from underneath, positioned relative to outer container */}
              <AnimatePresence>
                {showHoverButton && !isFlipping && (
                  <motion.button
                    initial={{ 
                      opacity: 0,
                      y: 10,
                      scale: 0.8
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0,
                      y: 10,
                      scale: 0.8
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    onClick={handleFlip}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-[var(--accent-secondary)] flex items-center justify-center hover:bg-[var(--accent-secondary)] transition-colors duration-200 shadow-sm group z-20"
                    aria-label="Flip avatar"
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
                      className="text-[var(--accent-secondary)] group-hover:text-white transition-colors"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      <path d="M17 8h4v4" />
                      <path d="M12 12l-4-4 4-4" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_DELAYS.bio, duration: 0.6 }}
            className="max-w-3xl space-y-4 text-base text-[var(--foreground-muted)] leading-relaxed"
          >
            <p>
              I am a design leader with experience building teams, products, experiments, and{' '}
              <span className="text-[var(--accent-primary)] font-medium">[AI experiences]</span> across 
              startups and enterprise, focusing on{' '}
              <span className="text-[var(--accent-secondary)] font-medium">[B2B experiences]</span> that 
              help people work smarter and faster.
            </p>
            <p>
              With over 15 years in product, strategy & design, and 10+ years leading & coaching teams, 
              I&apos;ve pushed over a million pixels and learned that the work always matters, but how 
              people get work done matters more.
            </p>
            <p>
              <span className="text-[var(--foreground)]">Open to contract and freelance opportunities.</span>{' '}
              If you&apos;re working on something cool, let&apos;s chat!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          {/* Philosophy Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mt-20"
          >
            <h2 className="font-mono text-sm font-medium text-[var(--foreground-muted)] mb-8 uppercase tracking-widest">
              On Building Craft Excellence
            </h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-4"
            >
              {principles.map((principle, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-base text-[var(--foreground-muted)]"
                >
                  <span className="text-[var(--accent-primary)] mt-1 font-mono">→</span>
                  {principle}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
