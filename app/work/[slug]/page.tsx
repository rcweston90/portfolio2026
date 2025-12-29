'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Sample project data - in production, this would come from getProjectBySlug()
const projectsData: Record<string, {
  title: string;
  description: string;
  role: string;
  duration: string;
  tags: string[];
  content: string;
  url?: string;
}> = {
  'design-system': {
    title: 'Design System',
    description: 'A comprehensive design system built from the ground up, featuring reusable components, tokens, and documentation for seamless collaboration between design and development teams.',
    role: 'Lead Designer & Developer',
    duration: '6 months',
    tags: ['Design Systems', 'React', 'Figma', 'Storybook', 'TypeScript'],
    url: 'https://example.com',
    content: `
## Overview

This design system was created to unify the visual language across multiple products and streamline the development process. It includes a comprehensive component library, design tokens, and extensive documentation.

## The Challenge

The company had grown rapidly, and with multiple products came inconsistency in design and duplicated development efforts. Each team was building similar components from scratch, leading to wasted time and a fragmented user experience.

## The Solution

I led the initiative to create a unified design system that would serve as the single source of truth for both designers and developers. The system includes:

- **Design Tokens**: A systematic approach to colors, typography, spacing, and other foundational elements
- **Component Library**: 50+ reusable React components with full TypeScript support
- **Documentation**: Comprehensive docs with usage examples, best practices, and accessibility guidelines
- **Figma Library**: A complete Figma component library that syncs with the code

## Impact

- Reduced development time for new features by 40%
- Improved design consistency across all products
- Decreased bug reports related to UI by 60%
- Accelerated onboarding for new team members
    `,
  },
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    description: 'End-to-end redesign of an e-commerce experience, improving conversion rates by 40% through user research and iterative design.',
    role: 'Product Designer',
    duration: '4 months',
    tags: ['UI/UX', 'E-Commerce', 'User Research', 'Prototyping'],
    content: `
## Overview

A complete redesign of an established e-commerce platform to improve user experience and increase conversion rates.

## The Challenge

The existing platform had a dated design and complex checkout flow that was causing cart abandonment. Analytics showed a 70% drop-off rate at checkout.

## Research & Discovery

I conducted extensive user research including:
- User interviews with 20+ customers
- Competitive analysis of 8 leading e-commerce sites
- Usability testing of the existing platform
- Analytics review and heatmap analysis

## The Solution

Based on research insights, I redesigned the entire shopping experience with a focus on:
- Simplified navigation and product discovery
- Streamlined checkout (reduced from 5 steps to 2)
- Mobile-first responsive design
- Trust signals and social proof integration

## Results

- 40% increase in conversion rate
- 25% reduction in cart abandonment
- 50% improvement in mobile transactions
    `,
  },
  'mobile-banking': {
    title: 'Mobile Banking App',
    description: 'A modern mobile banking application focused on accessibility and ease of use for all demographics.',
    role: 'UX Designer',
    duration: '8 months',
    tags: ['Mobile', 'FinTech', 'Accessibility', 'iOS', 'Android'],
    content: `
## Overview

Designed a mobile banking app that prioritizes accessibility and simplicity, making banking accessible to users of all ages and abilities.

## The Challenge

Traditional banking apps can be overwhelming and inaccessible. The goal was to create an app that senior citizens and users with disabilities could use as easily as tech-savvy millennials.

## Design Principles

- Large, readable text with high contrast
- Simple, intuitive navigation
- Voice-over and screen reader compatibility
- Haptic feedback for important actions
- Clear visual hierarchy

## Key Features

- One-tap balance check
- Simplified money transfers
- Bill payment reminders
- Spending insights with visualizations
- Biometric authentication

## Accessibility Achievements

- WCAG 2.1 AAA compliance
- 98% user satisfaction rating from accessibility testing
- Featured in iOS App Store's "Apps for All" collection
    `,
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-[var(--foreground)]">
            Project Not Found
          </h1>
          <p className="mt-4 text-[var(--foreground-muted)]">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/work" className="mt-6 btn-primary inline-block">
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors mb-8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.667 8H3.333M7.333 4l-4 4 4 4" />
              </svg>
              Back to Work
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)]"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-lg text-[var(--foreground-muted)] leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-8"
          >
            <div>
              <p className="text-sm text-[var(--foreground-muted)]">Role</p>
              <p className="font-medium text-[var(--foreground)]">{project.role}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--foreground-muted)]">Duration</p>
              <p className="font-medium text-[var(--foreground)]">{project.duration}</p>
            </div>
            {project.url && (
              <div>
                <p className="text-sm text-[var(--foreground-muted)]">Link</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent-primary)] hover:underline"
                >
                  View Live →
                </a>
              </div>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--card-bg)] text-[var(--foreground-muted)] border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Image Placeholder */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center"
          >
            <span className="text-6xl opacity-50">🖼️</span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto prose prose-invert prose-lg"
        >
          {/* Render markdown content */}
          {project.content.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="font-serif text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-12 mb-4">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('- **')) {
              const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
              if (match) {
                return (
                  <p key={index} className="text-[var(--foreground-muted)] my-2">
                    <strong className="text-[var(--foreground)]">{match[1]}</strong>: {match[2]}
                  </p>
                );
              }
            }
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-[var(--foreground-muted)] ml-4">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim()) {
              return (
                <p key={index} className="text-[var(--foreground-muted)] leading-relaxed my-4">
                  {line}
                </p>
              );
            }
            return null;
          })}
        </motion.div>
      </section>

      {/* Navigation */}
      <section className="px-6 py-12 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.667 8H3.333M7.333 4l-4 4 4 4" />
            </svg>
            All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}

