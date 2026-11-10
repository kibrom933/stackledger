import Link from "next/link";
import type { Guide } from "@/lib/content";

const typeLabel = { guide: "Guide", comparison: "Comparison", review: "Review", article: "Article" } as const;

export function GuideCard({ g }: { g: Pick<Guide, "slug" | "title" | "description" | "type" | "status" | "readingMinutes"> }) {
  return (
    <Link href={`/guides/${g.slug}`} className="group block rounded-md border border-line p-6 transition hover:border-brand hover:bg-brand-soft/50">
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="rounded-md bg-brand-soft px-2 py-0.5 font-medium text-brand">{typeLabel[g.type]}</span>
        <span>{g.readingMinutes} min</span>
        {g.status !== "published" && <span className="rounded-md bg-accent-soft px-2 py-0.5 text-accent">Draft</span>}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-brand">{g.title}</h3>
      <p className="mt-2 text-sm text-muted">{g.description}</p>
    </Link>
  );
}
