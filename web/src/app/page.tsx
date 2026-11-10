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
        <p className="text-sm font-medium uppercase tracking-widest text-ochre">Til selvstændige og små virksomheder i Danmark</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Vælg software, der passer til din virksomhed. Ikke til vores provision.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Vi opretter selv prøvekonti, gennemgår priser og vilkår og tjekker kravene fra myndighederne, så du kan vælge regnskab, fakturering, CRM og AI-værktøjer med ro i maven. Skærmbilleder er fra vores egne konti, og vi skriver aldrig, at vi har testet noget, vi ikke har testet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/guides" className="rounded-full bg-forest px-6 py-3 font-medium text-paper hover:opacity-90">Se alle guides</Link>
          <Link href="/om-os" className="rounded-full border border-line px-6 py-3 font-medium hover:border-forest">Sådan arbejder vi</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} href={`/kategori/${c.slug}`} className="rounded-2xl bg-forest-soft p-5 transition hover:bg-forest hover:text-paper">
              <p className="font-display text-lg font-semibold">{c.name}</p>
              <p className="mt-1 text-sm opacity-80">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="font-display text-2xl font-semibold">Nyeste guides</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
          {guides.length === 0 && <p className="text-muted">De første guides er på vej.</p>}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="grid gap-8 rounded-3xl bg-ochre-soft p-8 sm:p-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">Ét brev om måneden. Kun det nyttige.</h2>
            <p className="mt-2 text-muted">Frister fra SKAT og Erhvervsstyrelsen, nye guides og prisændringer. Afmeld med ét klik.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
