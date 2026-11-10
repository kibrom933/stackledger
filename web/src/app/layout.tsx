import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { site, categories } from "@/lib/site";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description:
    "Hands-on, sourced reviews of AI tools for freelancers and small teams, with prices, privacy and GDPR checked from Europe. We always say when a link earns us a commission.",
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {/* Cookieless analytics: no consent banner needed for this script. Anything that sets cookies must go behind consent. */}
        {plausible && (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.outbound-links.js" strategy="afterInteractive" />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-paper">Skip to content</a>
        <header className="sticky top-0 z-20 border-b border-ink/90 bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
              <BrandMark /> {site.name}
            </Link>
            <nav aria-label="Main" className="flex items-center gap-1 text-sm">
              <Link href="/guides" className="rounded-md px-3 py-2 hover:bg-brand-soft">Guides</Link>
              <Link href="/about" className="hidden rounded-md px-3 py-2 hover:bg-brand-soft sm:inline">How we test</Link>
              <Link href="/newsletter" className="rounded-md bg-brand px-4 py-2 font-medium text-paper hover:opacity-90">Newsletter</Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="mt-24 border-t border-ink/90">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:grid-cols-3">
            <div>
              <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"><BrandMark /> {site.name}</p>
              <p className="mt-2 text-muted">{site.tagline}. Some links earn us a commission. That never changes what we recommend.</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Topics</p>
              <ul className="mt-3 space-y-1.5 text-muted">
                {categories.map((c) => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-ink">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">About</p>
              <ul className="mt-3 space-y-1.5 text-muted">
                <li><Link href="/about" className="hover:text-ink">How we test</Link></li>
                <li><Link href="/affiliate-disclosure" className="hover:text-ink">Affiliate disclosure</Link></li>
                <li><Link href="/privacy" className="hover:text-ink">Privacy policy</Link></li>
                <li><Link href="/cookies" className="hover:text-ink">Cookies</Link></li>
                <li><Link href="/terms" className="hover:text-ink">Terms</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function BrandMark() {
  // Three ledger rows stacked, the last one ticked off in lime.
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="6" fill="var(--color-ink)" />
      <rect x="7" y="8" width="18" height="3" fill="var(--color-paper)" />
      <rect x="7" y="14.5" width="18" height="3" fill="var(--color-paper)" />
      <rect x="7" y="21" width="11" height="3" fill="var(--color-highlight)" />
      <rect x="21" y="21" width="4" height="3" fill="var(--color-brand)" />
    </svg>
  );
}
