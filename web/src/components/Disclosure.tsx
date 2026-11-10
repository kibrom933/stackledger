import Link from "next/link";

/** Shown before the content on every page with commissioned links: disclose before the reader engages (FTC; Danish marketing law). */
export function Disclosure({ hasAffiliateLinks }: { hasAffiliateLinks: boolean }) {
  if (!hasAffiliateLinks) return null;
  return (
    <aside role="note" className="rounded-xl border border-ochre/40 bg-ochre-soft px-4 py-3 text-sm">
      <strong>Advertising disclosure:</strong> This page contains affiliate links. If you sign up or buy through one, Driftig earns a
      commission from the vendor at no extra cost to you. Commissions never decide our verdicts.{" "}
      <Link href="/affiliate-disclosure" className="underline underline-offset-2">How we make money</Link>
    </aside>
  );
}
