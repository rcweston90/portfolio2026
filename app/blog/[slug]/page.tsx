'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Sample blog post data - in production, this would come from getBlogPostBySlug()
const blogPostsData: Record<string, {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}> = {
  'designing-for-ai': {
    title: 'Designing for AI: Lessons from Building Conversational Interfaces',
    description: 'What I learned about UX design while building AI-powered products and why traditional design patterns might not apply.',
    date: '2024-01-15',
    readingTime: '8 min read',
    tags: ['AI', 'Design', 'UX'],
    content: `
## The Rise of Conversational Interfaces

We're in the midst of a fundamental shift in how people interact with software. The traditional paradigm of clicks, taps, and form fills is being augmented—and in some cases replaced—by natural language conversations.

## Why Traditional Design Patterns Fall Short

When I first started designing AI-powered interfaces, I made the mistake of treating them like any other product. I created beautiful, pixel-perfect mockups with carefully considered interaction patterns.

But AI is different. Here's why:

### Unpredictability

Unlike traditional software where inputs map to predictable outputs, AI responses can vary. The same question asked twice might yield different answers. This unpredictability requires us to design for ambiguity.

### Context Awareness

AI can (and should) remember context from previous interactions. This changes how we think about navigation and state management. Users don't need to "go back" or "start over" in the same way.

### Natural Language Variations

There are infinite ways to ask for the same thing. Good AI design accounts for this, but it also means we can't rely on users following a specific path.

## Principles I've Learned

### 1. Design for Conversation, Not Tasks

Instead of thinking in terms of user flows and task completion, think in terms of conversations. What would a helpful assistant say here? How would they handle confusion?

### 2. Set Expectations Early

Be transparent about what the AI can and can't do. Users who understand the limitations are more forgiving when things go wrong.

### 3. Provide Escape Hatches

Always give users a way to reach a human or switch to a more traditional interface. AI should augment, not trap.

### 4. Embrace Iteration

AI products require constant refinement based on real user interactions. Build systems that allow you to learn and improve quickly.

## Looking Forward

The field of AI UX is still in its infancy. We're all learning together. The designers who will thrive are those who approach this space with curiosity and humility.

What patterns have you discovered while designing for AI? I'd love to hear your experiences.
    `,
  },
  'design-systems-at-scale': {
    title: 'Building Design Systems at Scale',
    description: 'A deep dive into creating and maintaining design systems that actually get adopted across large organizations.',
    date: '2023-12-20',
    readingTime: '12 min read',
    tags: ['Design Systems', 'Process'],
    content: `
## The Promise and Reality of Design Systems

Design systems promise consistency, efficiency, and better collaboration. But the reality is that many design systems fail to achieve adoption. Let's talk about why and what to do about it.

## Common Failure Modes

### Building in Isolation

The biggest mistake I see is teams building design systems without involving their users (other designers and developers). You end up with a beautiful, well-documented system that nobody uses.

### Over-Engineering Early

Starting with a complex, comprehensive system before you understand your real needs leads to bloat and confusion. Start small and grow organically.

### Treating It as a Project, Not a Product

Design systems need ongoing investment. If you launch and move on, the system will drift from reality and become irrelevant.

## What Actually Works

### Start with Pain Points

Instead of building a comprehensive system from day one, identify the biggest inconsistencies and inefficiencies in your current workflow. Solve those first.

### Build with Your Users

Create a working group of designers and developers from different teams. Get their input early and often. They're more likely to adopt something they helped create.

### Document as You Go

Don't wait until the system is "complete" to document it. Good documentation is often the difference between adoption and abandonment.

### Measure Impact

Track metrics like time-to-design, time-to-develop, and consistency scores. Use data to prioritize improvements and demonstrate value to leadership.

## The Human Side

Technical excellence isn't enough. You need to sell your design system internally. This means:

- Celebrating teams that adopt the system
- Making it easy to contribute
- Being responsive to feedback
- Showing the business value

A design system is ultimately a culture change, not just a technical deliverable.
    `,
  },
  'side-projects': {
    title: 'Why Side Projects Matter (And How to Actually Finish Them)',
    description: 'Strategies for turning your endless list of half-baked ideas into completed projects you can be proud of.',
    date: '2023-11-08',
    readingTime: '6 min read',
    tags: ['Career', 'Productivity'],
    content: `
## The Graveyard of Unfinished Projects

If you're anything like me, you have a folder (or several) full of started-but-never-finished projects. That todo app you were going to build. That game idea. That utility that would "definitely be useful."

Sound familiar?

## Why Side Projects Matter

Before we talk about finishing them, let's talk about why they matter:

### Learning Without Stakes

Work projects come with pressure. Side projects let you experiment, fail, and learn without consequences.

### Portfolio Building

Especially early in your career, side projects demonstrate initiative and capability when you don't have extensive work experience to show.

### Creative Outlet

Sometimes your job doesn't let you use the skills you want to develop or work on problems you find interesting. Side projects fill that gap.

## The Secret to Actually Finishing

### 1. Scope Ruthlessly

The number one reason projects don't get finished is they're too ambitious. Cut your vision in half. Then cut it in half again. What's the absolute minimum viable version?

### 2. Set a Deadline

Without external pressure, there's always tomorrow. Give yourself a deadline. Make it public if that helps you commit.

### 3. Ship Ugly

Perfectionism kills projects. Ship something embarrassing. You can always improve it later (spoiler: you probably won't, and that's fine).

### 4. Work in Public

Sharing your progress—even when it's rough—creates accountability and can provide motivation through feedback.

### 5. Know When to Quit

Not every project deserves to be finished. Sometimes you learn what you needed to learn after a few hours. That's okay. The goal isn't 100% completion rate; it's learning and growth.

## My Challenge to You

Pick one project from your graveyard. Give it a one-week deadline. Ship something. Let me know how it goes.
    `,
  },
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">📝</span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-[var(--foreground)]">
            Post Not Found
          </h1>
          <p className="mt-4 text-[var(--foreground-muted)]">
            This blog post doesn&apos;t exist.
          </p>
          <Link href="/blog" className="mt-6 btn-primary inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-6 py-20 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
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
              Back to Blog
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 text-sm text-[var(--foreground-muted)] mb-4"
          >
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-lg text-[var(--foreground-muted)] leading-relaxed"
          >
            {post.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {post.tags.map((tag) => (
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
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {post.content.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="font-serif text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-12 mb-4">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={index} className="font-serif text-xl font-semibold text-[var(--foreground)] mt-8 mb-3">
                  {line.replace('### ', '')}
                </h3>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-[var(--foreground-muted)] ml-4 my-1 leading-relaxed">
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
        </motion.article>
      </section>

      {/* Share & Navigation */}
      <section className="px-6 py-12 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          {/* Share */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-sm text-[var(--foreground-muted)]">Share this post:</span>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] border border-[var(--border)] transition-colors"
                aria-label="Share on X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] border border-[var(--border)] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Back to blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-medium hover:underline"
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
              Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

