import Link from "next/link";
import type { Guide } from "@/lib/content";

const typeLabel = { guide: "Guide", comparison: "Sammenligning", review: "Test", article: "Artikel" } as const;

export function GuideCard({ g }: { g: Pick<Guide, "slug" | "title" | "description" | "type" | "status" | "readingMinutes"> }) {
  return (
    <Link href={`/guides/${g.slug}`} className="group block rounded-2xl border border-line p-6 transition hover:border-forest hover:bg-forest-soft/50">
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="rounded-full bg-forest-soft px-2 py-0.5 font-medium text-forest">{typeLabel[g.type]}</span>
        <span>{g.readingMinutes} min</span>
        {g.status !== "published" && <span className="rounded-full bg-ochre-soft px-2 py-0.5 text-ochre">Kladde</span>}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-forest">{g.title}</h3>
      <p className="mt-2 text-sm text-muted">{g.description}</p>
    </Link>
  );
}
