import Link from "next/link";
import { allGuides } from "@/lib/content";
import { categories } from "@/lib/site";
import { GuideCard } from "@/components/GuideCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  const guides = allGuides().slice(0, 6);
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">For freelancers and small teams</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere] sm:text-6xl">
              AI tools that <span className="marker">earn their subscription</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              We sign up, pay where we have to, and run the same real tasks through every tool. Then we record the price you will actually pay, where your data goes, and what the terms say about training on it. We never claim to have tested something we have not.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/guides" className="rounded-md bg-brand px-5 py-3 font-medium text-paper hover:opacity-90">Browse all guides</Link>
              <Link href="/about" className="rounded-md border border-ink/80 px-5 py-3 font-medium hover:bg-ink hover:text-paper">How we test</Link>
            </div>
          </div>
          <LedgerCard />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Topics</h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="bg-paper p-5 transition hover:bg-brand-soft">
              <p className="font-display text-lg font-semibold tracking-tight">{c.name} <span aria-hidden className="text-brand">→</span></p>
              <p className="mt-1 text-sm text-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Latest guides</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
          {guides.length === 0 && <p className="text-muted">The first guides are on their way.</p>}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="grid gap-8 rounded-lg bg-ink p-8 text-paper [&_.text-muted]:text-paper/70 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">One email a month. Only what is useful.</h2>
            <p className="mt-2 text-muted">Price changes, new tests and rule changes that affect the AI tools you pay for. Unsubscribe in one click.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

/* What every review records. Column headings only: real values appear per tool, with a source and a date. */
function LedgerCard() {
  const rows = [
    ["Real price", "per seat, monthly vs annual, VAT"],
    ["Trains on your data", "yes / no / opt-out, from the terms"],
    ["Data location", "EU, US or unstated"],
    ["Retention", "how long inputs are kept"],
    ["EU AI Act notes", "what it means for your use"],
    ["Affiliate link", "labelled, every time"],
  ];
  return (
    <figure className="mr-1.5 rounded-md border border-ink/80 bg-paper shadow-[6px_6px_0_0_var(--color-ink)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-ink/80 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] sm:text-xs">
        <span>Every review records</span>
        <span className="shrink-0 whitespace-nowrap rounded-sm bg-highlight px-1.5 py-0.5 text-[#0c0e13]">sourced + dated</span>
      </figcaption>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[1fr_1.3fr] gap-3 bg-paper px-4 py-3 text-sm">
            <dt className="font-medium">{k}</dt>
            <dd className="font-mono text-xs leading-5 text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
