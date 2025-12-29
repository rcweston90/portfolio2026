'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedText } from '@/core/primitives';
import { ProjectCard } from '@/core/composites';

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image?: string;
  featured?: boolean;
}

interface HomeClientProps {
  featuredProjects: Project[];
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--accent-primary)] font-mono text-sm uppercase tracking-wider mb-4"
            >
              GREETING
            </motion.p>

            {/* Main Heading */}
            <AnimatedText
              text="Hello there, I'm Charlie Weston"
              as="h1"
              className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight uppercase tracking-tight"
              delay={0.2}
            />

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl leading-relaxed"
            >
              I am a design leader with experience building{' '}
              <span className="text-[var(--accent-primary)] font-medium">[teams, products, experiments]</span> and{' '}
              <span className="text-[var(--accent-secondary)] font-medium">[AI experiences]</span> across 
              startups and enterprise, focusing on B2B experiences that help people work smarter and faster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/work" className="btn-primary inline-flex items-center gap-2">
                VIEW_WORK
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 rounded-sm border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wider text-sm"
              >
                ABOUT_ME
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12 pb-4 border-b border-[var(--border)]"
          >
            <div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-[var(--foreground)] uppercase tracking-wide">
                FEATURED_WORK
              </h2>
              <p className="mt-2 text-sm text-[var(--foreground-muted)] uppercase tracking-wider">
                Selected projects I&apos;m proud of
              </p>
            </div>
            <Link
              href="/work"
              className="hidden md:flex items-center gap-2 text-[var(--accent-primary)] font-mono text-xs uppercase tracking-wider hover:text-[var(--accent-secondary)] transition-colors"
            >
              VIEW_ALL →
            </Link>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                href={`/work/${project.slug}`}
                image={project.image}
                featured={project.featured}
              />
            ))}
          </div>

          {/* Mobile View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center md:hidden"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-mono text-xs uppercase tracking-wider"
            >
              VIEW_ALL →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills/Expertise Section */}
      <section className="px-6 py-20 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 pb-4 border-b border-[var(--border)]"
          >
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-[var(--foreground)] uppercase tracking-wide">
              FOCUS AREAS
            </h2>
            <p className="mt-2 text-sm text-[var(--foreground-muted)] uppercase tracking-wider">
              Research • Strategy • Design • Operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Research & Analysis',
                description:
                  'Conducting thorough investigations to inform design decisions and validate product hypotheses.',
                icon: '🔍',
              },
              {
                title: 'Design & Product Strategy',
                description:
                  'Crafting strategic plans that align with business objectives while prioritizing user needs.',
                icon: '🎯',
              },
              {
                title: 'Systems & Operations',
                description:
                  'Creating cohesive systems and implementing agile methodologies to streamline workflows.',
                icon: '⚙️',
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-sm bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <span className="text-3xl">{skill.icon}</span>
                <h3 className="mt-4 font-mono text-lg font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  {skill.title}
                </h3>
                <p className="mt-2 text-[var(--foreground-muted)] text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-[var(--foreground)] uppercase tracking-wide">
              LET&apos;S CREATE SOMETHING TOGETHER
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)] text-base">
              Open to freelance opportunities and interesting collaborations.
            </p>
            <motion.a
              href="mailto:charlie.rcweston@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 btn-primary inline-block"
            >
              GET_IN_TOUCH
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

