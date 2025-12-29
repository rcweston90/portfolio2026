'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/core/composites';
import { AnimatedText } from '@/core/primitives';

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image?: string;
  featured?: boolean;
}

interface WorkClientProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function WorkClient({ projects }: WorkClientProps) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 pb-4 border-b border-[var(--border)]">
          <AnimatedText
            text="My Work"
            as="h1"
            className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-base text-[var(--foreground-muted)] max-w-2xl"
          >
            A collection of projects spanning B2B product design, AI experiences, design systems, 
            and growth experiments across startups and enterprise.
          </motion.p>
        </div>

        {/* Filter Tags (optional visual element) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {['All', 'Design', 'Development', 'Mobile', 'Branding'].map((filter, index) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors uppercase tracking-wider ${
                index === 0
                  ? 'bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)]'
                  : 'bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              [{filter}]
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
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
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center p-8 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] uppercase tracking-wide">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            I&apos;d love to hear about it. Let&apos;s discuss how we can work together.
          </p>
            <motion.a
            href="mailto:charlie.rcweston@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 btn-primary inline-block"
          >
            GET_IN_TOUCH
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

