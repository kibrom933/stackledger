export function TextPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      {process.env.NODE_ENV !== "production" && (
        <p className="mb-6 rounded-lg bg-ochre-soft px-4 py-2 text-sm text-ochre">Udkast: skal gennemgås (evt. af jurist) og have firmaoplysninger udfyldt før lancering.</p>
      )}
      <h1 className="font-display text-4xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted">Senest opdateret {updated}</p>
      <div className="prose prose-lg prose-driftig mt-8 max-w-none">{children}</div>
    </div>
  );
}
