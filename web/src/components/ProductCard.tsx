import { buildOutboundUrl, freshPrice, partnerById, type Product } from "@/lib/partners";

export function ProductCard({ product, fromSlug }: { product: Product; fromSlug: string }) {
  const { affiliate } = buildOutboundUrl(product);
  const partner = partnerById(product.partnerId);
  const price = freshPrice(product);
  return (
    <div className="not-prose rounded-md border border-line bg-paper p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted">{product.brand}</p>
      <h3 className="mt-1 font-display text-lg font-semibold">{product.name}</h3>
      <ul className="mt-3 space-y-1 text-sm">
        {product.facts.map((f) => (
          <li key={f.text}>• {f.text} <a href={f.source} className="text-muted underline" rel="nofollow noopener" target="_blank">source</a></li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={`/go/${product.id}?from=${encodeURIComponent(fromSlug)}`}
          rel={affiliate ? "sponsored nofollow noopener" : "nofollow noopener"}
          target="_blank"
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          Visit {partner?.name ?? product.brand}
        </a>
        {affiliate && <span className="text-xs font-medium text-accent">Affiliate link (ad)</span>}
        {price !== null && <span className="text-sm text-muted">from {price.toLocaleString("en-US", { style: "currency", currency: product.currency ?? "USD" })}{product.priceUnit ?? ""} (checked {product.priceCheckedAt})</span>}
      </div>
    </div>
  );
}
