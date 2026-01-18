'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useVaultAuth } from '@/core/hooks/useVaultAuth';
import { ProjectCard } from '@/core/composites';

interface Project {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image?: string;
  featured?: boolean;
}

interface VaultedWorkSectionProps {
  projects: Project[];
}

function PlaceholderTile({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative overflow-hidden rounded-md bg-[var(--card-bg)] border border-[var(--border)] shadow-[var(--shadow-sm)] aspect-[4/3] flex items-center justify-center"
    >
      {/* Blurred gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 blur-xl" />
      
      {/* Lock icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--foreground-muted)]"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-wider">
          Locked
        </span>
      </div>
    </motion.div>
  );
}

function PasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authenticate } = useVaultAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (authenticate(password)) {
      onSuccess();
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
    >
      <div className="flex-1 w-full sm:w-auto">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Enter password"
          className="w-full px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-mono text-sm"
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 font-mono">{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-2 rounded-md bg-[var(--accent-primary)] text-white font-mono text-xs uppercase tracking-wider hover:bg-[var(--accent-secondary)] transition-colors whitespace-nowrap"
      >
        Unlock
      </button>
    </motion.form>
  );
}

export function VaultedWorkSection({ projects }: VaultedWorkSectionProps) {
  const { isAuthenticated, isChecking, logout } = useVaultAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  if (isChecking) {
    return (
      <section className="mt-20 pt-20 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 pt-20 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-[var(--foreground)] uppercase tracking-wide">
                Vaulted Work
              </h2>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                Confidential and experimental projects
              </p>
            </div>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider"
              >
                Lock
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider"
              >
                {showPasswordForm ? 'Cancel' : 'Unlock'}
              </button>
            )}
          </div>

          {/* Password Form */}
          {!isAuthenticated && showPasswordForm && (
            <div className="mt-6">
              <PasswordForm onSuccess={() => setShowPasswordForm(false)} />
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isAuthenticated ? (
            // Show actual projects when authenticated
            projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  href={`/work/${project.slug}`}
                  image={project.image}
                  size="medium"
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
                No vaulted projects yet
              </div>
            )
          ) : (
            // Show placeholder tiles when not authenticated
            Array.from({ length: Math.max(projects.length || 0, 3) }).map((_, index) => (
              <PlaceholderTile key={index} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

