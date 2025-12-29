'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Button, 
  Tag, 
  SocialLink, 
  SectionHeader, 
  AnimatedText 
} from '@/core/primitives';
import { ProjectCard, PhotoGrid } from '@/core/composites';
import { ScrollProgress, CustomCursor, PageTransition } from '@/core/effects';
import { LoadingScreen } from '@/core/feedback';

export default function PreviewPage() {
  const [showLoading, setShowLoading] = useState(false);
  const [key, setKey] = useState(0);

  const replayAnimation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gradient mb-4">
            Component Library
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Preview all components from the /core library. 
            Hover, click, and interact to see animations and states.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <h2 className="font-serif text-xl font-bold mb-4">Components</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Buttons', 'Tags', 'Social Links', 'Section Headers', 
              'Animated Text', 'Project Cards', 'Photo Grid', 
              'Effects', 'Color Tokens', 'Typography'
            ].map((section) => (
              <a 
                key={section}
                href={`#${section.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1.5 text-sm rounded-full bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] border border-[var(--border)] transition-colors"
              >
                {section}
              </a>
            ))}
          </div>
        </nav>

        {/* Buttons */}
        <section id="buttons">
          <h2 className="font-serif text-3xl font-bold mb-2">Buttons</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Versatile button component with variants, sizes, and states.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Style</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth className="max-w-xs">Full Width</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  leftIcon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  }
                >
                  Add Item
                </Button>
                <Button 
                  variant="secondary"
                  rightIcon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
                    </svg>
                  }
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section id="tags">
          <h2 className="font-serif text-3xl font-bold mb-2">Tags</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Small labels for categorization and metadata display.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Tag>Default</Tag>
                <Tag variant="outline">Outline</Tag>
                <Tag variant="solid">Solid</Tag>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Tag size="sm">Small</Tag>
                <Tag size="md">Medium</Tag>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Interactive</h3>
              <div className="flex flex-wrap gap-2">
                <Tag onClick={() => alert('Clicked!')}>Clickable</Tag>
                <Tag removable onRemove={() => alert('Remove clicked!')}>Removable</Tag>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Use Case: Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map(tech => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section id="social-links">
          <h2 className="font-serif text-3xl font-bold mb-2">Social Links</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Styled links for social media profiles with platform-specific icons.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">Platforms</h3>
              <div className="flex gap-4">
                <SocialLink href="#" platform="linkedin" label="LinkedIn" />
                <SocialLink href="#" platform="github" label="GitHub" />
                <SocialLink href="#" platform="twitter" label="Twitter/X" />
                <SocialLink href="mailto:hello@example.com" platform="email" label="Email" />
                <SocialLink href="#" platform="website" label="Website" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">With Labels</h3>
              <div className="flex flex-wrap gap-4">
                <SocialLink href="#" platform="github" label="GitHub" showLabel />
                <SocialLink href="#" platform="linkedin" label="LinkedIn" showLabel />
                <SocialLink href="mailto:hello@example.com" platform="email" label="Email Me" showLabel />
              </div>
            </div>
          </div>
        </section>

        {/* Section Headers */}
        <section id="section-headers">
          <h2 className="font-serif text-3xl font-bold mb-2">Section Headers</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Reusable title + subtitle pattern with optional action slot.
          </p>
          
          <div className="space-y-12 p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
            <SectionHeader 
              title="Left Aligned (Default)" 
              subtitle="With a descriptive subtitle" 
            />
            
            <hr className="border-[var(--border)]" />
            
            <SectionHeader 
              title="Center Aligned" 
              subtitle="Great for hero sections and CTAs" 
              align="center"
            />
            
            <hr className="border-[var(--border)]" />
            
            <SectionHeader 
              title="With Action Button" 
              subtitle="Includes a slot for buttons or links"
              action={<Button variant="link">View All →</Button>}
            />
          </div>
        </section>

        {/* Animated Text */}
        <section id="animated-text">
          <h2 className="font-serif text-3xl font-bold mb-2">Animated Text</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Text that animates in word-by-word with 3D rotation effect.
          </p>
          
          <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
            <Button onClick={replayAnimation} variant="secondary" className="mb-8">
              Replay Animation
            </Button>
            
            <AnimatedText 
              key={key}
              text="This text animates in beautifully word by word"
              as="h3"
              className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)]"
            />
          </div>
        </section>

        {/* Project Cards */}
        <section id="project-cards">
          <h2 className="font-serif text-3xl font-bold mb-2">Project Cards</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Cards for showcasing projects with images, descriptions, and tags.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Standard Card"
              description="A regular project card with hover effects, gradient overlay placeholder, and animated arrow indicator."
              tags={['React', 'TypeScript', 'Design']}
              href="#"
            />
            <ProjectCard
              title="Another Project"
              description="Cards animate in on scroll and lift up on hover with a subtle glow effect."
              tags={['Next.js', 'Tailwind']}
              href="#"
            />
            <ProjectCard
              title="Featured Project"
              description="Featured cards span two columns on larger screens. Perfect for highlighting important work with more visual space."
              tags={['Featured', 'Case Study', 'UX Research']}
              href="#"
              featured
            />
          </div>
        </section>

        {/* Photo Grid */}
        <section id="photo-grid">
          <h2 className="font-serif text-3xl font-bold mb-2">Photo Grid</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Polaroid-style scattered photo layout with hover animations.
          </p>
          
          <PhotoGrid 
            photos={[
              { src: '', alt: 'Adventure' },
              { src: '', alt: 'Coffee Time' },
              { src: '', alt: 'Team Meetup' },
              { src: '', alt: 'Travel' },
              { src: '', alt: 'Workspace' },
              { src: '', alt: 'Weekend' },
            ]}
          />
        </section>

        {/* Effects */}
        <section id="effects">
          <h2 className="font-serif text-3xl font-bold mb-2">Effects</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Visual effects and animations that enhance the experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h3 className="font-serif text-xl font-semibold mb-2">Scroll Progress</h3>
              <p className="text-sm text-[var(--foreground-muted)] mb-4">
                The gold bar at the top of the page shows scroll progress.
              </p>
              <p className="text-xs text-[var(--accent-primary)]">↑ Look at the top!</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h3 className="font-serif text-xl font-semibold mb-2">Custom Cursor</h3>
              <p className="text-sm text-[var(--foreground-muted)] mb-4">
                Desktop only - dot with ring that reacts to interactive elements.
              </p>
              <p className="text-xs text-[var(--accent-primary)]">Hover over buttons!</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h3 className="font-serif text-xl font-semibold mb-2">Loading Screen</h3>
              <p className="text-sm text-[var(--foreground-muted)] mb-4">
                Full-screen loading overlay with animated logo.
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShowLoading(true)}
              >
                Show Loading
              </Button>
            </div>
          </div>
        </section>

        {/* Color Tokens */}
        <section id="color-tokens">
          <h2 className="font-serif text-3xl font-bold mb-2">Color Tokens</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Design tokens extracted from CSS variables for consistent theming.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Background', var: '--background', desc: 'Main bg' },
              { name: 'Secondary BG', var: '--background-secondary', desc: 'Cards, inputs' },
              { name: 'Foreground', var: '--foreground', desc: 'Main text' },
              { name: 'Muted', var: '--foreground-muted', desc: 'Secondary text' },
              { name: 'Accent Primary', var: '--accent-primary', desc: 'Amber/gold' },
              { name: 'Accent Secondary', var: '--accent-secondary', desc: 'Darker gold' },
              { name: 'Border', var: '--border', desc: 'Default borders' },
              { name: 'Card BG', var: '--card-bg', desc: 'Card surfaces' },
            ].map((token) => (
              <div key={token.name} className="text-center">
                <div 
                  className="w-full h-20 rounded-xl border border-[var(--border)] mb-3"
                  style={{ backgroundColor: `var(${token.var})` }}
                />
                <p className="font-medium text-sm">{token.name}</p>
                <p className="text-xs text-[var(--foreground-muted)]">{token.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section id="typography">
          <h2 className="font-serif text-3xl font-bold mb-2">Typography</h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            Font families and text styles used throughout the site.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">
                Cormorant Garamond (Serif)
              </h3>
              <p className="font-serif text-4xl font-bold mb-2">Headlines</p>
              <p className="font-serif text-2xl mb-2">Section Titles</p>
              <p className="font-serif text-xl italic">Elegant & Editorial</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
              <h3 className="text-sm font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4">
                Outfit (Sans-serif)
              </h3>
              <p className="text-lg font-bold mb-2">Body Text Bold</p>
              <p className="text-base mb-2">Regular body copy for readability and clean UI.</p>
              <p className="text-sm text-[var(--foreground-muted)]">Small text and captions</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-[var(--border)]">
          <p className="text-[var(--foreground-muted)]">
            Built with the{' '}
            <span className="text-[var(--accent-primary)]">/core</span>{' '}
            component library
          </p>
        </div>
      </div>

      {/* Loading Screen Demo */}
      {showLoading && (
        <LoadingScreen 
          text="Preview" 
          duration={2000}
          onLoadingComplete={() => setShowLoading(false)}
        />
      )}
    </div>
  );
}

