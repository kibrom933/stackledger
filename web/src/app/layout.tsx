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
    "Grundige, kildebaserede guides til software for selvstændige og små virksomheder i Danmark. Vi fortæller altid, når et link giver os provision.",
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {/* Cookieless analytics: no consent banner needed for this script. Anything that sets cookies must go behind consent. */}
        {plausible && (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.outbound-links.js" strategy="afterInteractive" />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-paper">Spring til indhold</a>
        <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
              <PawMark /> {site.name}
            </Link>
            <nav aria-label="Hovedmenu" className="flex items-center gap-1 text-sm">
              <Link href="/guides" className="rounded-full px-3 py-2 hover:bg-forest-soft">Guides</Link>
              <Link href="/om-os" className="hidden rounded-full px-3 py-2 hover:bg-forest-soft sm:inline">Sådan arbejder vi</Link>
              <Link href="/nyhedsbrev" className="rounded-full bg-forest px-4 py-2 font-medium text-paper hover:opacity-90">Nyhedsbrev</Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-semibold">{site.name}</p>
              <p className="mt-2 text-muted">{site.tagline}. Vi tjener provision på nogle links. Det ændrer aldrig, hvad vi anbefaler.</p>
            </div>
            <div>
              <p className="font-medium">Emner</p>
              <ul className="mt-2 space-y-1 text-muted">
                {categories.map((c) => (
                  <li key={c.slug}><Link href={`/kategori/${c.slug}`} className="hover:text-ink">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium">Om siden</p>
              <ul className="mt-2 space-y-1 text-muted">
                <li><Link href="/om-os" className="hover:text-ink">Sådan arbejder vi</Link></li>
                <li><Link href="/annoncering" className="hover:text-ink">Reklamelinks og provision</Link></li>
                <li><Link href="/privatliv" className="hover:text-ink">Privatlivspolitik</Link></li>
                <li><Link href="/cookies" className="hover:text-ink">Cookies</Link></li>
                <li><Link href="/vilkaar" className="hover:text-ink">Vilkår</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function PawMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden className="text-forest">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path d="M10 8h6.5a8 8 0 0 1 0 16H10z" fill="none" stroke="var(--color-paper)" strokeWidth="3" />
      <circle cx="22.5" cy="22.5" r="2.2" fill="var(--color-ochre)" />
    </svg>
  );
}
