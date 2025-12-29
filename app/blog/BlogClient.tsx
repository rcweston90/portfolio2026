'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedText } from '@/core/primitives';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
}

interface BlogClientProps {
  blogPosts: BlogPost[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

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

export default function BlogClient({ blogPosts }: BlogClientProps) {
  // Get unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  if (blogPosts.length === 0) {
    return (
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 pb-4 border-b border-[var(--border)]">
            <AnimatedText
              text="Blog"
              as="h1"
              className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-base text-[var(--foreground-muted)] max-w-2xl"
            >
              Thoughts on design, development, and the intersection of creativity and technology.
            </motion.p>
          </div>
          <p className="text-[var(--foreground-muted)]">No blog posts yet. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 pb-4 border-b border-[var(--border)]">
          <AnimatedText
            text="Blog"
            as="h1"
            className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-base text-[var(--foreground-muted)] max-w-2xl"
          >
            Thoughts on design, development, and the intersection of creativity and technology.
          </motion.p>
        </div>

        {/* Tags Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          <button className="px-4 py-2 rounded-sm text-xs font-medium bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] uppercase tracking-wider">
            [ALL]
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-sm text-xs font-medium bg-[var(--card-bg)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-colors uppercase tracking-wider"
            >
              [{tag}]
            </button>
          ))}
        </motion.div>

        {/* Blog Posts List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className="group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 -mx-6 rounded-sm border border-transparent hover:border-[var(--border)] hover:bg-[var(--card-bg)] transition-colors"
              >
                {/* Date & Reading Time */}
                <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-2 font-mono uppercase tracking-wider">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                {/* Title */}
                <h2 className="font-mono text-lg md:text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors uppercase tracking-wide">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-[var(--foreground-muted)] text-sm line-clamp-2">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] uppercase tracking-wide"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-[var(--accent-primary)] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                  <span>READ_MORE →</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] text-center uppercase tracking-wide">
            STAY_UPDATED
          </h2>
          <p className="mt-3 text-center text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
            Get notified when I publish new articles. No spam, unsubscribe anytime.
          </p>

          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-sm bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-mono text-sm"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              SUBSCRIBE
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}

