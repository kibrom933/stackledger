export function TextPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      {process.env.NODE_ENV !== "production" && (
        <p className="mb-6 rounded-lg bg-ochre-soft px-4 py-2 text-sm text-ochre">Draft: needs review (ideally by a lawyer) and company details filled in before launch.</p>
      )}
      <h1 className="font-display text-4xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
      <div className="prose prose-lg prose-stackledger mt-8 max-w-none">{children}</div>
    </div>
  );
}
