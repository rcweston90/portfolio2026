import Link from 'next/link';
import type { ReactElement } from 'react';
import { getBlogPostBySlug } from '@/lib/content';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function parseMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: ReactElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-lg font-normal text-[var(--foreground)] mt-10 mb-4 first:mt-0">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-normal text-[var(--foreground)] mt-8 mb-3 first:mt-0">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-[var(--foreground-muted)] before:content-['•'] before:mr-2">
          {line.replace('- ', '')}
        </li>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={key++} className="text-[var(--foreground-muted)] leading-relaxed my-6">
          {line}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen px-6 py-32 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-normal text-[var(--foreground)] mb-4">
            Post Not Found
          </h1>
          <p className="text-[var(--foreground-muted)] mb-8">
            This blog post doesn&apos;t exist.
          </p>
          <Link href="/blog" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-32">
      <div className="max-w-2xl mx-auto">
          {/* Back Link */}
            <Link
              href="/blog"
          className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-12 inline-block"
        >
          ← Back
            </Link>

        {/* Date */}
        <time 
          dateTime={post.meta.date}
          className="text-sm text-[var(--foreground-muted)] mb-4 block"
        >
          {formatDate(post.meta.date)}
        </time>

          {/* Title */}
        <h1 className="text-2xl font-normal text-[var(--foreground)] mb-6 leading-tight">
          {post.meta.title}
        </h1>

      {/* Content */}
        <article>
          {parseMarkdown(post.content)}
        </article>
        </div>
    </div>
  );
}

