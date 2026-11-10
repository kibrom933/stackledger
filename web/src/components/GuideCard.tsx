import Link from "next/link";
import type { Guide } from "@/lib/content";

const typeLabel = { guide: "Guide", comparison: "Comparison", review: "Review", article: "Article" } as const;

export function GuideCard({ g }: { g: Pick<Guide, "slug" | "title" | "description" | "type" | "status" | "readingMinutes"> }) {
  return (
    <Link href={`/guides/${g.slug}`} className="group block rounded-md border border-ink/80 bg-paper p-6 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink)]">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="text-brand">{typeLabel[g.type]}</span>
        <span>{g.readingMinutes} min</span>
        {g.status !== "published" && <span className="rounded-sm bg-highlight px-1.5 py-0.5 text-[#0c0e13]">Draft</span>}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{g.title}</h3>
      <p className="mt-2 text-sm text-muted">{g.description}</p>
    </Link>
  );
}
