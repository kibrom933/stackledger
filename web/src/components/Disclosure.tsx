import Link from "next/link";

/** Shown at the top of every page that contains (or may contain) affiliate links. Danish guidance: say it before the reader engages. */
export function Disclosure({ hasAffiliateLinks }: { hasAffiliateLinks: boolean }) {
  if (!hasAffiliateLinks) return null;
  return (
    <aside role="note" className="rounded-xl border border-ochre/40 bg-ochre-soft px-4 py-3 text-sm">
      <strong>Reklame:</strong> Denne side indeholder reklamelinks. Opretter du en konto eller køber via et af dem, får Driftig provision,
      uden at prisen ændrer sig for dig. Provision påvirker ikke vores vurderinger.{" "}
      <Link href="/annoncering" className="underline underline-offset-2">Læs mere</Link>
    </aside>
  );
}
