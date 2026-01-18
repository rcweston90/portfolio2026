'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/core/composites';
import { AnimatedText } from '@/core/primitives';
import { VaultedWorkSection } from './components/VaultedWorkSection';

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
  vaultedProjects?: Project[];
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WorkClient({ projects, vaultedProjects = [] }: WorkClientProps) {
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

        {/* Featured In Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mt-20 pt-20 border-t border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] mb-8 uppercase tracking-wide">
            FEATURED IN
          </h2>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {[
              {
                publication: 'Institute of Product Leadership',
                title: 'Why UX Research is Critical to Your Product Launch Strategy',
                category: 'Article',
                year: '2023',
                url: '#',
              },
              {
                publication: 'Cloudflare',
                title: 'Style Guide',
                category: 'Design System',
                year: '2022',
                url: '#',
              },
              {
                publication: 'ADP List',
                title: 'Designing Design Ops',
                category: 'Article',
                year: '2021',
                url: '#',
              },
              {
                publication: 'Not Just Pixels',
                title: 'Strategy, Designing for B2B, and Scrum Methodology with Charlie Weston',
                category: 'Podcast',
                year: '2020',
                url: '#',
              },
            ].map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-1 rounded-sm bg-[var(--accent-primary)] text-white font-mono text-xs font-bold uppercase tracking-wider">
                    {feature.publication}
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] font-mono text-xs uppercase tracking-wider border border-[var(--border)]">
                    {feature.category}
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] font-mono text-xs uppercase tracking-wider border border-[var(--border)]">
                    {feature.year}
                  </span>
                </div>
                <a
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[var(--foreground-muted)] leading-relaxed pl-0.5 hover:text-[var(--accent-primary)] transition-colors duration-200 group"
                >
                  {feature.title}
                  <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Vaulted Work Section */}
        <VaultedWorkSection projects={vaultedProjects} />
      </div>
    </div>
  );
}
