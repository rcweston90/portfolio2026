'use client';

import Link from 'next/link';

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

export default function BlogClient({ blogPosts }: BlogClientProps) {
  if (blogPosts.length === 0) {
    return (
      <div className="min-h-screen px-6 py-32">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--foreground-muted)]">No blog posts yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-2xl mx-auto">
        {/* Blog Posts List */}
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block group"
              >
                {/* Date */}
                <time 
                  dateTime={post.date}
                  className="text-sm text-[var(--foreground-muted)] mb-2 block"
                >
                  {formatDate(post.date)}
                </time>

                {/* Title */}
                <h2 className="text-xl font-normal text-[var(--foreground)] mb-3 group-hover:text-[var(--foreground-muted)] transition-colors">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

