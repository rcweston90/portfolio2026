'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedText } from '@/core/primitives';

interface FunProject {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

interface FunClientProps {
  projects: FunProject[];
}

// Emoji mapping based on project tags/title
function getProjectEmoji(project: FunProject): string {
  const title = project.title.toLowerCase();
  const tags = project.tags.map(t => t.toLowerCase());
  
  if (title.includes('art') || tags.includes('art')) return '🎨';
  if (title.includes('pomodoro') || tags.includes('cli')) return '🍅';
  if (title.includes('spotify') || tags.includes('music')) return '🎵';
  if (title.includes('keyboard') || tags.includes('hardware')) return '⌨️';
  if (title.includes('ai') || title.includes('chatbot')) return '🤖';
  if (title.includes('recipe') || tags.includes('food')) return '🍳';
  return '✨';
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

export default function FunClient({ projects }: FunClientProps) {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 pb-4 border-b border-[var(--border)]">
          <AnimatedText
            text="Fun Stuff"
            as="h1"
            className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-base text-[var(--foreground-muted)] max-w-2xl"
          >
            Side projects, experiments, and things I build for fun. 
            Not everything needs to be serious! 🎉
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative p-6 rounded-sm bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all duration-200"
            >
              <Link href={`/fun/${project.slug}`} className="block">
                {/* Emoji */}
                <motion.span
                  className="text-4xl block mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {getProjectEmoji(project)}
                </motion.span>

                {/* Title */}
                <h3 className="font-mono text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wide">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[var(--foreground-muted)] text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] uppercase tracking-wide"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-[var(--accent-primary)] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                  <span>EXPLORE →</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Fun Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] text-center mb-8 uppercase tracking-wide">
            SOME_FUN_STATS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '42+', label: 'Side Projects Started' },
              { number: '12', label: 'Actually Finished 😅' },
              { number: '∞', label: 'Cups of Coffee' },
              { number: '3am', label: 'Usual Coding Time' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl md:text-4xl font-bold font-mono text-[var(--accent-primary)]">
                  {stat.number}
                </p>
                <p className="mt-2 text-xs text-[var(--foreground-muted)] uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

