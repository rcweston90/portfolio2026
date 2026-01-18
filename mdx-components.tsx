import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-xl font-normal text-[var(--foreground)] mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-normal text-[var(--foreground)] mt-10 mb-4 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-normal text-[var(--foreground)] mt-8 mb-3 first:mt-0">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--foreground-muted)] leading-relaxed my-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-none text-[var(--foreground-muted)] my-6 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-none text-[var(--foreground-muted)] my-6 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[var(--foreground-muted)] before:content-['•'] before:mr-2">
        {children}
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[var(--foreground)] underline hover:text-[var(--foreground-muted)]"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-[var(--foreground-muted)] pl-4 my-6 text-[var(--foreground-muted)] italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="text-[var(--foreground)] font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto">
        {children}
      </pre>
    ),
    ...components,
  };
}

