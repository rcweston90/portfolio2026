# Portfolio Website

A modern, distinctive portfolio website built with Next.js 14, featuring a dark theme with warm amber accents, smooth animations, and a unique design aesthetic.

## Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Beautiful Animations**: Framer Motion powered page transitions and micro-interactions
- **Dark Theme**: Elegant dark theme with amber/gold accent colors
- **Responsive Design**: Fully responsive across all devices
- **Blog Support**: MDX-powered blog with syntax highlighting
- **SEO Optimized**: Meta tags, sitemap, robots.txt included

## Pages

- **Home** - Hero section with featured projects
- **Work** - Professional project showcase with case studies
- **Fun** - Personal projects and experiments
- **About** - Personal bio with photo grid and interests
- **Resume** - Experience timeline with PDF download
- **Blog** - Articles and thoughts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── work/            # Work/projects pages
│   ├── fun/             # Fun projects pages
│   ├── about/           # About page
│   ├── resume/          # Resume page
│   └── blog/            # Blog pages
├── components/          # Reusable React components
├── content/             # MDX content files
│   ├── projects/        # Work project content
│   ├── fun/             # Fun project content
│   └── blog/            # Blog post content
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Customization

### Theme Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --accent-primary: #d4a853;      /* Main accent color */
  --accent-secondary: #b8860b;    /* Secondary accent */
  --background: #0c0c0c;          /* Background color */
  --foreground: #f5f5f5;          /* Text color */
}
```

### Fonts

The site uses:
- **Cormorant Garamond** - Elegant serif for headings
- **Outfit** - Modern sans-serif for body text

Update in `app/globals.css` to change fonts.

### Content

- Add new projects in `content/projects/`
- Add blog posts in `content/blog/`
- Update personal info throughout the pages

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

```bash
npm run build
npm start
```

## Technologies

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [MDX](https://mdxjs.com/) - Markdown with JSX

## License

MIT License - feel free to use this as a starting point for your own portfolio!
