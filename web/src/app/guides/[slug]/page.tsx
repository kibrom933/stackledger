import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allGuides, guideBySlug } from "@/lib/content";
import { productById, buildOutboundUrl } from "@/lib/partners";
import { site, categories } from "@/lib/site";
import { Disclosure } from "@/components/Disclosure";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return allGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  return {
    title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` },
    robots: g.status === "published" ? undefined : { index: false, follow: false },
    openGraph: { type: "article", title: g.title, description: g.description, modifiedTime: g.updated.toISOString() },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const products = g.products.map(productById).filter((p) => !!p);
  const hasAffiliate = products.some((p) => buildOutboundUrl(p).affiliate);
  const cat = categories.find((c) => c.slug === g.category);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description,
    dateModified: g.updated.toISOString(), author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name }, mainEntityOfPage: `${site.url}/guides/${g.slug}`,
  };
  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {g.status !== "published" && (
        <p className="mb-4 rounded-lg bg-ochre-soft px-4 py-2 text-sm text-ochre">Kladde ({g.status}). Ikke synlig i produktion før den er godkendt.</p>
      )}
      <nav className="text-sm text-muted"><Link href="/guides" className="hover:text-ink">Guides</Link>{cat && <> / <Link href={`/kategori/${cat.slug}`} className="hover:text-ink">{cat.name}</Link></>}</nav>
      <header className="mt-4 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold leading-tight [overflow-wrap:anywhere] hyphens-auto sm:text-5xl">{g.title}</h1>
        <p className="mt-4 text-lg text-muted">{g.description}</p>
        <p className="mt-4 text-sm text-muted">
          Opdateret {g.updated.toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })} · {g.readingMinutes} min læsning · Skrevet af {g.author}
          {g.reviewedBy && <> · Faglig gennemlæsning: {g.reviewedBy}</>}
        </p>
      </header>
      <div className="mt-6 max-w-3xl"><Disclosure hasAffiliateLinks={hasAffiliate} /></div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_16rem]">
        <div>
          <div className="prose prose-lg prose-driftig max-w-none" dangerouslySetInnerHTML={{ __html: g.html }} />
          {products.length > 0 && (
            <section className="mt-12 space-y-4">
              <h2 className="font-display text-2xl font-semibold">Produkter nævnt i guiden</h2>
              {products.map((p) => <ProductCard key={p.id} product={p} fromSlug={g.slug} />)}
            </section>
          )}
          <section className="mt-12 rounded-2xl border border-line p-6 text-sm">
            <h2 className="font-display text-lg font-semibold">Kilder</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              {g.sources.map((s) => <li key={s.url}><a href={s.url} className="underline underline-offset-2" rel="noopener" target="_blank">{s.title}</a></li>)}
            </ol>
            <p className="mt-4 text-muted">Ser du en fejl? Skriv til {site.contactEmail}, så retter vi den og noterer rettelsen.</p>
          </section>
        </div>
        {g.headings.length > 2 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 text-sm">
              <p className="font-medium">Indhold</p>
              <ul className="mt-2 space-y-2 border-l border-line pl-4 text-muted">
                {g.headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="hover:text-ink">{h.text}</a></li>)}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
