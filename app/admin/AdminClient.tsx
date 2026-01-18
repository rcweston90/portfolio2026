'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAdminAuth } from '@/core/hooks/useAdminAuth';
import { getWipPages } from '@/lib/wip-pages';

function PasscodeForm({ onSuccess }: { onSuccess: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const { authenticate } = useAdminAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPasscode(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (passcode.length !== 6) {
      setError('Please enter a 6-digit passcode');
      return;
    }
    
    if (authenticate(passcode)) {
      onSuccess();
      setPasscode('');
    } else {
      setError('Incorrect passcode');
      setPasscode('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div>
        <label
          htmlFor="passcode"
          className="block text-sm font-mono text-[var(--foreground)] uppercase tracking-wider mb-2 font-semibold"
        >
          6-Digit Passcode
        </label>
        <input
          id="passcode"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={passcode}
          onChange={handleChange}
          placeholder="000000"
          maxLength={6}
          className="w-full px-4 py-3 rounded-md border-2 border-[var(--foreground-muted)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/50 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-colors font-mono text-2xl text-center tracking-widest"
        />
        {error && (
          <p className="mt-2 text-xs text-red-600 font-mono font-semibold">{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-md bg-[var(--accent-primary)] text-white font-mono text-sm uppercase tracking-wider hover:bg-[var(--accent-secondary)] transition-colors font-semibold shadow-lg shadow-[var(--accent-primary)]/20"
      >
        Authenticate
      </button>
    </motion.form>
  );
}

export default function AdminClient() {
  const { isAuthenticated, isChecking, logout } = useAdminAuth();
  const [showPasscodeForm, setShowPasscodeForm] = useState(false);
  const wipPages = getWipPages();

  if (isChecking) {
    return (
      <div className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6 border-b-2 border-[var(--foreground-muted)]/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-mono text-3xl md:text-4xl font-bold text-[var(--foreground)] uppercase tracking-wide">
                Admin
              </h1>
              <p className="mt-2 text-sm text-[var(--foreground)]/80 font-medium">
                Work in progress pages
              </p>
            </div>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md border-2 border-[var(--foreground-muted)] text-[var(--foreground)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider font-semibold"
              >
                Logout
              </button>
            )}
          </div>

          {/* Passcode Form */}
          {!isAuthenticated && (
            <div className="mt-8">
              {!showPasscodeForm ? (
                <button
                  onClick={() => setShowPasscodeForm(true)}
                  className="px-6 py-3 rounded-md border-2 border-[var(--foreground-muted)] bg-[var(--card-bg)] text-[var(--foreground)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors font-mono text-sm uppercase tracking-wider font-semibold"
                >
                  Enter Passcode
                </button>
              ) : (
                <div className="max-w-md">
                  <PasscodeForm onSuccess={() => setShowPasscodeForm(false)} />
                  <button
                    onClick={() => {
                      setShowPasscodeForm(false);
                    }}
                    className="mt-4 text-sm text-[var(--foreground)] hover:text-[var(--accent-primary)] font-mono uppercase tracking-wider font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* WIP Pages List */}
        {isAuthenticated ? (
          <div className="space-y-8">
            {/* Photo Management Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-md bg-[var(--card-bg)] border-2 border-[var(--foreground-muted)]/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-mono text-xl font-bold text-[var(--foreground)] uppercase tracking-wide mb-2">
                    Photo Gallery
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    Upload, view, and manage photos that appear on the /photos page.
                  </p>
                </div>
                <Link
                  href="/admin/photos"
                  className="px-4 py-2 rounded-md bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-secondary)] transition-colors font-mono text-xs uppercase tracking-wider whitespace-nowrap font-semibold"
                >
                  Manage Photos →
                </Link>
              </div>
            </motion.div>

            {/* WIP Pages */}
            <div className="space-y-4">
              <h2 className="font-mono text-xl font-bold text-[var(--foreground)] uppercase tracking-wide mb-4">
                WIP Pages
              </h2>
              {wipPages.length > 0 ? (
                wipPages.map((page, index) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-md bg-[var(--card-bg)] border-2 border-[var(--foreground-muted)]/30 hover:border-[var(--accent-primary)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={page.path}
                          className="block font-mono text-lg font-bold text-[var(--foreground)] hover:text-[var(--accent-primary)] transition-colors mb-1"
                        >
                          {page.name}
                        </Link>
                        <p className="text-sm text-[var(--foreground-muted)] font-mono mb-2">
                          {page.path}
                        </p>
                        {page.description && (
                          <p className="text-sm text-[var(--foreground-muted)]">
                            {page.description}
                          </p>
                        )}
                      </div>
                      <Link
                        href={page.path}
                        className="px-4 py-2 rounded-md border-2 border-[var(--foreground-muted)] text-[var(--foreground)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider whitespace-nowrap font-semibold"
                      >
                        View →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
                  No WIP pages configured
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--foreground)]/70 font-mono text-sm uppercase tracking-wider font-medium">
            Authenticate to view WIP pages
          </div>
        )}
      </div>
    </div>
  );
}

