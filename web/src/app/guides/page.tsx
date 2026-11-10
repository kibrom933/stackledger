import type { Metadata } from "next";
import { allGuides } from "@/lib/content";
import { GuideSearch } from "@/components/GuideSearch";

export const metadata: Metadata = { title: "All guides", description: "Search every Stackledger guide and review of AI tools for freelancers and small teams." };

export default function GuidesPage() {
  const items = allGuides().map((g) => ({
    slug: g.slug, title: g.title, description: g.description, type: g.type, status: g.status,
    readingMinutes: g.readingMinutes, category: g.category,
    text: g.html.replace(/<[^>]+>/g, " ").slice(0, 4000),
  }));
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Stackledger</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">All guides</h1>
      <div className="mt-8"><GuideSearch items={items} /></div>
    </div>
  );
}
