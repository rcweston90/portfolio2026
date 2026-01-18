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
  size,
  className = '',
}: ProjectCardProps) {
  // Determine size: use size prop if provided, otherwise fall back to featured
  const cardSize = size || (featured ? 'wide' : 'medium');
  
  // Get grid classes based on size
  const getSizeClasses = () => {
    switch (cardSize) {
      case 'small':
        return 'col-span-1 md:col-span-1 md:row-span-1';
      case 'large':
        return 'col-span-1 md:col-span-2 md:row-span-2';
      case 'wide':
        return 'col-span-1 md:col-span-2 md:row-span-1';
      case 'tall':
        return 'col-span-1 md:col-span-1 md:row-span-2';
      case 'medium':
      default:
        return 'col-span-1 md:col-span-1 md:row-span-1';
    }
  };

  // Get aspect ratio based on size
  const getAspectRatio = () => {
    switch (cardSize) {
      case 'large':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[2/1]';
      case 'tall':
        return 'aspect-[1/2]';
      case 'small':
        return 'aspect-[4/3]';
      case 'medium':
      default:
        return 'aspect-[4/3]';
    }
  };

  // Get padding based on size
  const getPadding = () => {
    switch (cardSize) {
      case 'large':
        return 'p-8';
      case 'wide':
        return 'p-6';
      case 'tall':
        return 'p-6';
      case 'small':
        return 'p-4';
      case 'medium':
      default:
        return 'p-6';
    }
  };

  // Get title size based on card size
  const getTitleSize = () => {
    switch (cardSize) {
      case 'large':
        return 'text-xl md:text-2xl';
      case 'wide':
        return 'text-lg md:text-xl';
      case 'tall':
        return 'text-lg md:text-xl';
      case 'small':
        return 'text-base md:text-lg';
      case 'medium':
      default:
        return 'text-lg md:text-xl';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      className={`
        group relative overflow-hidden rounded-md
        bg-[var(--card-bg)] border border-[var(--border)] 
        transition-all duration-300 ease-out
        hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-hover)]
        shadow-[var(--shadow-sm)]
        ${getSizeClasses()}
        ${className}
      `}
    >
      <Link href={href} className="block h-full w-full relative">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/40 to-[var(--accent-secondary)]/40" />
          )}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>

        {/* Content Overlay */}
        <div className={`relative h-full w-full flex flex-col justify-end ${getPadding()} z-10`}>
          <h3 className={`font-mono ${getTitleSize()} font-semibold text-white group-hover:text-[var(--accent-secondary)] transition-colors uppercase tracking-wide drop-shadow-lg`}>
            {title}
          </h3>
          
          <p className={`mt-2 text-white/90 ${cardSize === 'small' ? 'text-xs' : 'text-sm'} ${cardSize === 'large' ? 'md:text-base' : 'md:text-base'} ${cardSize === 'large' ? 'line-clamp-3' : 'line-clamp-2'} drop-shadow-md`}>
            {description}
          </p>

          {/* Tags */}
          <div className={`mt-4 flex flex-wrap gap-2 ${cardSize === 'small' ? 'mt-2' : ''}`}>
            {tags.slice(0, cardSize === 'small' ? 2 : cardSize === 'large' ? 6 : 4).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 ${cardSize === 'small' ? 'text-[10px]' : 'text-xs'} font-medium rounded-sm bg-white/20 backdrop-blur-sm text-white border border-white/30 uppercase tracking-wide`}
              >
                [{tag}]
              </span>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className={`mt-auto pt-4 flex items-center gap-2 text-white ${cardSize === 'small' ? 'text-[10px]' : 'text-xs'} font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider`}>
            <span>View →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProjectCard;

