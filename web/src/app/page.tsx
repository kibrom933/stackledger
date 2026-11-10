import Link from "next/link";
import { allGuides } from "@/lib/content";
import { categories } from "@/lib/site";
import { GuideCard } from "@/components/GuideCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  const guides = allGuides().slice(0, 6);
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:pt-24">
        <p className="text-sm font-medium uppercase tracking-widest text-ochre">For freelancers and small teams</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          AI tools that earn their subscription. Tested, priced, privacy-checked.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          We sign up, pay where we have to, and run the same real tasks through every tool. Then we check the price you will actually pay, where your data goes, and what the terms say about training on it. Screenshots come from our own accounts, and we never claim to have tested something we have not.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides" className="rounded-full bg-forest px-6 py-3 font-medium text-paper hover:opacity-90">Browse all guides</Link>
          <Link href="/about" className="rounded-full border border-line px-6 py-3 font-medium hover:border-forest">How we test</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-2xl bg-forest-soft p-5 transition hover:bg-forest hover:text-paper">
              <p className="font-display text-lg font-semibold">{c.name}</p>
              <p className="mt-1 text-sm opacity-80">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="font-display text-2xl font-semibold">Latest guides</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
          {guides.length === 0 && <p className="text-muted">The first guides are on their way.</p>}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="grid gap-8 rounded-3xl bg-ochre-soft p-8 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">One email a month. Only what is useful.</h2>
            <p className="mt-2 text-muted">Price changes, new tests and rule changes that affect the AI tools you pay for. Unsubscribe in one click.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
