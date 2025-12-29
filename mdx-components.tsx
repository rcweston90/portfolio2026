import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mt-6 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--foreground-muted)] leading-relaxed my-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-[var(--foreground-muted)] my-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-[var(--foreground-muted)] my-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[var(--foreground-muted)]">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[var(--accent-primary)] hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--accent-primary)] pl-4 my-4 italic text-[var(--foreground-muted)]">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-[var(--card-bg)] px-2 py-1 rounded text-sm font-mono text-[var(--accent-primary)]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[var(--card-bg)] p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    ...components,
  };
}

