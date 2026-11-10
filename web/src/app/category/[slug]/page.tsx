import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allGuides } from "@/lib/content";
import { categories } from "@/lib/site";
import { GuideCard } from "@/components/GuideCard";

export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  return c ? { title: c.name, description: c.blurb } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const guides = allGuides().filter((g) => g.category === c.slug);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">{c.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{c.blurb}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => <GuideCard key={g.slug} g={g} />)}
        {guides.length === 0 && <p className="text-muted">We are working on the first guides in this category.</p>}
      </div>
    </div>
  );
}
