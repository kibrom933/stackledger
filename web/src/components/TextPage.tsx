export function TextPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      {process.env.NODE_ENV !== "production" && (
        <p className="mb-6 border-l-4 border-highlight bg-accent-soft px-4 py-2 font-mono text-xs text-ink">Draft: needs review (ideally by a lawyer) and company details filled in before launch.</p>
      )}
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Last updated {updated}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{title}</h1>
      <div className="prose prose-lg prose-stackledger mt-8 max-w-none">{children}</div>
    </div>
  );
}
