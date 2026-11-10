"use client";
import { useMemo, useState } from "react";
import { GuideCard } from "./GuideCard";

type Item = { slug: string; title: string; description: string; type: "guide" | "comparison" | "review" | "article"; status: "draft" | "review" | "published"; readingMinutes: number; category: string; text: string };

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

export function GuideSearch({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items
      .map((it) => {
        const hay = norm(`${it.title} ${it.title} ${it.description} ${it.text}`);
        const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 + (norm(it.title).includes(t) ? 2 : 0) : -100), 0);
        return { it, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.it);
  }, [q, items]);
  return (
    <div>
      <label htmlFor="search" className="sr-only">Search guides</label>
      <input id="search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. 'meeting notes' or 'voice cloning'"
        className="w-full rounded-md border border-ink/80 bg-paper px-5 py-3 text-lg outline-none focus:ring-2 focus:ring-brand" />
      <p className="mt-3 font-mono text-xs text-muted" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {results.map((g) => <GuideCard key={g.slug} g={g} />)}
      </div>
    </div>
  );
}
