# Core Component Library

A collection of reusable UI components, hooks, and design tokens for the portfolio website. Designed for consistency, maintainability, and future Storybook integration.

## Structure

```
core/
├── primitives/       # Basic building blocks
│   ├── Button/       # Versatile button component
│   ├── Text/         # AnimatedText component
│   ├── Tag/          # Label/tag component
│   ├── SocialLink/   # Social media link
│   └── SectionHeader/# Section title pattern
│
├── composites/       # Complex components
│   ├── Card/         # ProjectCard component
│   └── PhotoGrid/    # Polaroid-style photo grid
│
├── layout/           # Page structure
│   ├── Navigation/   # Main navigation header
│   └── Footer/       # Site footer
│
├── feedback/         # User feedback
│   └── LoadingScreen/# Loading overlay
│
├── effects/          # Visual effects
│   ├── PageTransition/
│   ├── ScrollProgress/
│   └── CustomCursor/
│
├── tokens/           # Design tokens
│   ├── colors.ts     # Color definitions
│   ├── typography.ts # Font & text styles
│   ├── spacing.ts    # Spacing, radius, breakpoints
│   └── animations.ts # Easing, duration, springs
│
└── hooks/            # Custom React hooks
    ├── useMediaQuery.ts
    └── useScrollProgress.ts
```

## Usage

### Importing Components

```tsx
// Import from specific category
import { Button, Tag, AnimatedText } from '@/core/primitives';
import { ProjectCard, PhotoGrid } from '@/core/composites';
import { Navigation, Footer } from '@/core/layout';
import { ScrollProgress, CustomCursor } from '@/core/effects';
import { LoadingScreen } from '@/core/feedback';

// Import everything
import { Button, Navigation, ProjectCard, tokens } from '@/core';
```

### Using Design Tokens

```tsx
import { colors, spacing, typography, easing } from '@/core/tokens';

// Use in components
const style = {
  color: colors.accent.primary,
  padding: spacing[4],
  fontFamily: typography.fontFamily.serif,
};
```

### Using Hooks

```tsx
import { useScrollProgress, useIsMobile, usePrefersReducedMotion } from '@/core/hooks';

function MyComponent() {
  const { progress, direction } = useScrollProgress();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // ...
}
```

## Component Guidelines

### Naming Conventions
- Components: PascalCase (e.g., `ProjectCard`)
- Hooks: camelCase with `use` prefix (e.g., `useScrollProgress`)
- Types: PascalCase with descriptive suffix (e.g., `ButtonProps`, `TagVariant`)

### File Structure
Each component should have:
- `ComponentName.tsx` - Main component
- `ComponentName.types.ts` - TypeScript interfaces
- `index.ts` - Barrel export

### Documentation
- Use JSDoc comments for component documentation
- Include `@example` blocks showing usage
- Document all props with descriptions and defaults

## Future Storybook Integration

This library is designed to be easily integrated with Storybook:

1. Install Storybook: `npx storybook@latest init`
2. Create stories in each component folder:
   ```
   ComponentName/
   ├── ComponentName.tsx
   ├── ComponentName.types.ts
   ├── ComponentName.stories.tsx  # Add this
   └── index.ts
   ```

### Example Story

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};
```

## Extracting to Separate Package

To extract this as a standalone package:

1. Create a new repo or monorepo workspace
2. Copy the `/core` folder
3. Add `package.json`:
   ```json
   {
     "name": "@yourname/ui",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "peerDependencies": {
       "framer-motion": "^12.0.0",
       "next": "^14.0.0",
       "react": "^18.0.0"
     }
   }
   ```
4. Set up build with tsup or rollup
5. Publish to npm or use as internal package

## Contributing

1. Create component in appropriate category
2. Add types in separate `.types.ts` file
3. Export from category `index.ts`
4. Update main `core/index.ts` if needed
5. Add documentation/examples

