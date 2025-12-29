'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCardProps } from './Card.types';

/**
 * ProjectCard Component
 * 
 * A card component for displaying project information with image, title,
 * description, and tags. Includes hover animations and responsive design.
 * 
 * @example
 * ```tsx
 * <ProjectCard
 *   title="Design System"
 *   description="A comprehensive design system..."
 *   tags={['React', 'TypeScript', 'Figma']}
 *   href="/work/design-system"
 *   image="/images/design-system.jpg"
 *   featured
 * />
 * ```
 */
export function ProjectCard({
  title,
  description,
  tags,
  image,
  href,
  featured = false,
  className = '',
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      className={`
        group relative overflow-hidden rounded-sm 
        bg-[var(--card-bg)] border border-[var(--border)] 
        transition-all duration-200 
        hover:border-[var(--accent-primary)]
        ${featured ? 'md:col-span-2' : ''}
        ${className}
      `}
    >
      <Link href={href} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-[4/3]'}`}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20" />
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-40" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-mono text-lg md:text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wide">
            {title}
          </h3>
          
          <p className="mt-2 text-[var(--foreground-muted)] text-sm md:text-base line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] uppercase tracking-wide"
              >
                [{tag}]
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center gap-2 text-[var(--accent-primary)] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
            <span>View →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProjectCard;

