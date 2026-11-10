import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { site, categories } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {/* Cookieless analytics: no consent banner needed for this script. Anything that sets cookies must go behind consent. */}
        {plausible && (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.outbound-links.js" strategy="afterInteractive" />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-paper">Skip to content</a>
        <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
              <BrandMark /> {site.name}
            </Link>
            <nav aria-label="Main" className="flex items-center gap-1 text-sm">
              <Link href="/guides" className="rounded-full px-3 py-2 hover:bg-forest-soft">Guides</Link>
              <Link href="/about" className="hidden rounded-full px-3 py-2 hover:bg-forest-soft sm:inline">How we test</Link>
              <Link href="/newsletter" className="rounded-full bg-forest px-4 py-2 font-medium text-paper hover:opacity-90">Newsletter</Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-semibold">{site.name}</p>
              <p className="mt-2 text-muted">{site.tagline}. Some links earn us a commission. That never changes what we recommend.</p>
            </div>
            <div>
              <p className="font-medium">Topics</p>
              <ul className="mt-2 space-y-1 text-muted">
                {categories.map((c) => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-ink">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium">About</p>
              <ul className="mt-2 space-y-1 text-muted">
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
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden className="text-forest">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <rect x="8" y="9" width="16" height="3" rx="1.5" fill="var(--color-paper)" />
      <rect x="8" y="14.5" width="16" height="3" rx="1.5" fill="var(--color-paper)" />
      <rect x="8" y="20" width="10" height="3" rx="1.5" fill="var(--color-paper)" />
      <circle cx="22.5" cy="21.5" r="2.2" fill="var(--color-ochre)" />
    </svg>
  );
}
