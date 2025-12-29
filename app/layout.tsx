import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/core/layout";
import { Footer } from "@/core/layout";
import { ScrollProgress } from "@/core/effects";

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
      <body className="gradient-bg min-h-screen">
        <ScrollProgress />
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
