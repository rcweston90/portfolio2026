'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/core/primitives';
import { PhotoGrid } from '@/core/composites';

// Sample photos for the grid
const photos = [
  { src: '', alt: 'Hiking adventure' },
  { src: '', alt: 'Coffee & code' },
  { src: '', alt: 'Design meetup' },
  { src: '', alt: 'Travel vibes' },
  { src: '', alt: 'Studio setup' },
  { src: '', alt: 'Weekend project' },
];

const interests = [
  'research & analysis to inform design decisions',
  'design & product strategy that aligns with business objectives',
  'agile & operations to streamline workflows',
  'new product design from concept to launch',
  'legacy product design and revitalization',
  'experimentation design to test hypotheses',
  'systems design for cohesive user experiences',
];

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

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Intro */}
        <section className="max-w-3xl mb-20 pb-4 border-b border-[var(--border)]">
          <AnimatedText
            text="Hello there, I'm Charlie Weston."
            as="h1"
            className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] leading-tight uppercase tracking-tight"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 space-y-6 text-lg text-[var(--foreground-muted)] leading-relaxed"
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="mailto:charlie.rcweston@gmail.com" className="btn-primary">
              SAY_HELLO
            </a>
            <a
              href="/resume"
              className="px-6 py-3 rounded-sm border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider text-sm"
            >
              VIEW_RESUME
            </a>
          </motion.div>
        </section>

        {/* Photo Grid Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <PhotoGrid photos={photos} />
        </motion.section>

        {/* Interests Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] mb-8 uppercase tracking-wide">
            FOCUS AREAS
          </h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {interests.map((interest, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 text-base text-[var(--foreground-muted)]"
              >
                <span className="text-[var(--accent-primary)] mt-1 font-mono">→</span>
                {interest}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mt-20"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] mb-8 uppercase tracking-wide">
            ON BUILDING CRAFT EXCELLENCE
          </h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              'The work always matters, but how people get work done matters more.',
              'Simplification is both the bedrock of innovation and its limiting factor.',
              'Launching and learning is the end-goal; don\'t get caught in an iterative loop.',
              'Momentum compounds in all directions.',
              'Data is your best defense when selling in abstract ideas; use it to influence minds.',
              'Give back as you climb; sharing experiences opens doors both ways.',
              'Excellence in craft demands holistic balance.',
              'A bad strategy is worse than no strategy; be purposeful in your intentions.',
            ].map((principle, index) => (
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

        {/* Featured In Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] text-center mb-8 uppercase tracking-wide">
            FEATURED IN
          </h2>
          <div className="space-y-3 text-center">
            {[
              '"Why UX Research is Critical to Your Product Launch Strategy" – Institute of Product Leadership',
              '"Style Guide" – Cloudflare',
              '"Designing Design Ops" – ADP List',
              '"Strategy, Designing for B2B, and Scrum Methodology with Charlie Weston" – Not Just Pixels',
            ].map((feature, index) => (
              <p key={index} className="text-sm text-[var(--foreground-muted)]">
                {feature}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Connect Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] text-center mb-4 uppercase tracking-wide">
            LET&apos;S CONNECT
          </h2>
          <p className="text-center text-sm text-[var(--foreground-muted)] mb-8">
            To befriend me or hire me, reach out through any of these channels!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rcweston', icon: '💼' },
              { name: 'X (Twitter)', href: 'https://twitter.com/rcweston', icon: '🐦' },
              { name: 'Email', href: 'mailto:charlie.rcweston@gmail.com', icon: '✉️' },
            ].map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors text-sm uppercase tracking-wider"
              >
                <span>{link.icon}</span>
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
