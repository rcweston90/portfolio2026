# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on port 6969
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture

This is a Next.js 16 portfolio site using the App Router with TypeScript and Tailwind CSS v4.

### Core Component Library (`/core`)

The project has a custom component library organized by category:

- **primitives/**: Basic building blocks (Button, Tag, Text, SocialLink, SectionHeader, Icon, AsciiArt)
- **composites/**: Complex components (Card, PhotoGrid, PhotoCollage, SpiderChart, Timeline)
- **layout/**: Page structure (Navigation, Footer)
- **effects/**: Visual effects (PageTransition, ScrollProgress, CustomCursor)
- **feedback/**: User feedback (LoadingScreen)
- **tokens/**: Design tokens (colors, typography, spacing, animations)
- **hooks/**: Custom hooks (useMediaQuery, useScrollProgress, useScrollSpy, useAdminAuth, useVaultAuth)

Import from category barrel exports:
```tsx
import { Button, Tag } from '@/core/primitives';
import { ProjectCard } from '@/core/composites';
import { colors, spacing } from '@/core/tokens';
```

### Content System (`/content` + `/lib/content.ts`)

MDX content with gray-matter frontmatter:

- `content/projects/` - Work projects (ProjectMeta interface)
- `content/fun/` - Personal projects
- `content/blog/` - Blog posts (BlogMeta interface)

Frontmatter for projects:
```yaml
title: "Project Name"
description: "..."
tags: ["Tag1", "Tag2"]
image: ""
featured: true
vaulted: false
date: "2021-10-01"
role: "Role"
duration: "Oct 2021 – Aug 2023"
url: "https://..."
```

### Image Handling

Remote images configured in `next.config.ts` for Unsplash, Picsum, placeholder.com, and Vercel Blob storage. See `lib/blob.ts` for Vercel Blob integration.

### Path Alias

`@/*` maps to project root (configured in tsconfig.json).
