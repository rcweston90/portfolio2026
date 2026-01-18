import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/core/layout";
import { Footer } from "@/core/layout";
import { ScrollProgress } from "@/core/effects";

// Hidden ASCII art for curious inspectors
function DevToolsArt({ art }: { art: string }) {
  return (
    <template
      id="hello-inspector"
      data-message={art}
      dangerouslySetInnerHTML={{ __html: `<!--${art}-->` }}
    />
  );
}

const asciiArt = `

   ╦ ╦╔═╗╦  ╦  ╔═╗  ╔╦╗╦ ╦╔═╗╦═╗╔═╗
   ╠═╣║╣ ║  ║  ║ ║   ║ ╠═╣║╣ ╠╦╝║╣ 
   ╩ ╩╚═╝╩═╝╩═╝╚═╝   ╩ ╩ ╩╚═╝╩╚═╚═╝

              .-.
             (o o)
            /| K |\\
           / |   | \\
              | |
             /   \\
            /     \\
           /_______\\
          |         |
          |  KENOBI |
          |_________|
             || ||
             || ||
            _|| ||_
           |__| |__|

   ┌───────────────────────────────────┐
   │  General Kenobi!                  │
   │                                   │
   │  You are a bold one.              │
   └───────────────────────────────────┘

`;

export const metadata: Metadata = {
  title: {
    default: "Charlie Weston | Design Leader",
    template: "%s | Charlie Weston",
  },
  description: "Design leader with experience building teams, products, experiments, and AI experiences across startups and enterprise, focusing on B2B experiences that help people work smarter and faster.",
  keywords: ["design leader", "product design", "B2B", "design systems", "AI experiences", "UX", "product strategy", "agile", "experimentation"],
  authors: [{ name: "Charlie Weston" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Charlie Weston",
    title: "Charlie Weston | Design Leader",
    description: "Design leader with experience building teams, products, experiments, and AI experiences across startups and enterprise, focusing on B2B experiences that help people work smarter and faster.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Weston | Design Leader",
    description: "Design leader with experience building teams, products, experiments, and AI experiences across startups and enterprise, focusing on B2B experiences that help people work smarter and faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DevToolsArt art={asciiArt} />
      <body className="gradient-bg min-h-screen">
        <ScrollProgress />
        <Navigation />
        <main className="pt-20 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
