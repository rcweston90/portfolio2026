'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/core/primitives';
import ComponentShow from '../fun/ComponentShow';

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Page Header */}
      <section className="px-6 py-12 md:py-16 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedText
            text="Playground"
            as="h1"
            className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-base text-[var(--foreground-muted)] max-w-2xl"
          >
            A collection of projects, builds, and creative explorations
          </motion.p>
        </div>
      </section>
      
      <ComponentShow />
    </div>
  );
}

