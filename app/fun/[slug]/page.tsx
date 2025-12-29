'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Sample fun project data
const funProjectsData: Record<string, {
  title: string;
  description: string;
  emoji: string;
  tags: string[];
  content: string;
  github?: string;
  demo?: string;
}> = {
  'generative-art': {
    title: 'Generative Art Collection',
    description: 'Experimenting with creative coding and generative art using p5.js and canvas.',
    emoji: '🎨',
    tags: ['Creative Coding', 'p5.js', 'Canvas', 'Art'],
    github: 'https://github.com',
    demo: 'https://example.com',
    content: `
## The Spark

I've always been fascinated by the intersection of code and art. One evening, I stumbled upon some generative art on Twitter and thought, "I need to try this."

## The Journey

Started with simple shapes and colors, then gradually moved to:
- Perlin noise for organic patterns
- Particle systems for flow fields
- Recursive algorithms for fractals
- Color theory exploration

## What I Learned

Creative coding is the perfect break from "serious" development. There's no right or wrong—just experimentation and happy accidents.

## Favorite Pieces

Each piece is generated uniquely every time the code runs. No two outputs are the same, which is part of the magic.
    `,
  },
  'pomodoro-cli': {
    title: 'CLI Pomodoro Timer',
    description: 'A beautiful command-line pomodoro timer with stats tracking and notifications.',
    emoji: '🍅',
    tags: ['CLI', 'Rust', 'Productivity', 'Terminal'],
    github: 'https://github.com',
    content: `
## Why Another Pomodoro Timer?

Because I wanted one that:
- Lived in my terminal
- Looked beautiful with colors and progress bars
- Tracked my stats over time
- Had satisfying notifications

## Features

- Beautiful ASCII art tomato 🍅
- Customizable work/break durations
- Local stats with weekly/monthly reports
- Desktop notifications
- Spotify integration for focus playlists

## Tech Stack

Built with Rust for speed and reliability. Uses:
- crossterm for terminal manipulation
- serde for data persistence
- notify-rust for notifications
    `,
  },
  'spotify-wrapped': {
    title: 'Spotify Wrapped Clone',
    description: 'Built my own version of Spotify Wrapped with custom visualizations.',
    emoji: '🎵',
    tags: ['API', 'Data Viz', 'Music', 'React'],
    github: 'https://github.com',
    demo: 'https://example.com',
    content: `
## The Idea

I love Spotify Wrapped but wanted more control over the visualizations and data. Plus, why wait until December?

## What It Does

- Fetches your listening history from Spotify API
- Analyzes patterns and trends
- Creates beautiful, shareable visualizations
- Shows your "audio aura" based on track features

## Cool Discoveries

Found out I listen to 80% of my music between midnight and 3am. Not sure if that's concerning or not.
    `,
  },
};

export default function FunProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = funProjectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">🤷</span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-[var(--foreground)]">
            Project Not Found
          </h1>
          <p className="mt-4 text-[var(--foreground-muted)]">
            This fun project doesn&apos;t exist... yet!
          </p>
          <Link href="/fun" className="mt-6 btn-primary inline-block">
            Back to Fun Stuff
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
              href="/fun"
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
              Back to Fun Stuff
            </Link>
          </motion.div>

          {/* Emoji & Title */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-7xl block mb-6"
          >
            {project.emoji}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)]"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-lg text-[var(--foreground-muted)] leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Live Demo
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
                  <path d="M4 12L12 4M12 4H5M12 4V11" />
                </svg>
              </a>
            )}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
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

      {/* Content */}
      <section className="px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {project.content.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="font-serif text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-12 mb-4">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-[var(--foreground-muted)] ml-4 my-1">
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
    </div>
  );
}

