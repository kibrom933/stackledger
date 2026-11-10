import type { Metadata } from "next";
import { allGuides } from "@/lib/content";
import { GuideSearch } from "@/components/GuideSearch";

export const metadata: Metadata = { title: "All guides", description: "Search every Driftig guide and review of AI tools for freelancers and small teams." };

export default function GuidesPage() {
  const items = allGuides().map((g) => ({
    slug: g.slug, title: g.title, description: g.description, type: g.type, status: g.status,
    readingMinutes: g.readingMinutes, category: g.category,
    text: g.html.replace(/<[^>]+>/g, " ").slice(0, 4000),
  }));
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl font-semibold">Guides</h1>
      <div className="mt-8"><GuideSearch items={items} /></div>
    </div>
  );
}
