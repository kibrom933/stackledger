import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { partners, isAffiliateActive } from "@/lib/partners";

export const metadata: Metadata = { title: "Reklamelinks og provision", description: "Hvilke firmaer vi samarbejder med, og hvordan vi markerer reklamelinks." };

export default function Disclosure() {
  const active = partners.filter(isAffiliateActive);
  return (
    <TextPage title="Reklamelinks og provision" updated="10. november 2026">
      <p>Driftig er gratis at læse, fordi vi får provision, når nogen køber via vores reklamelinks. Det er reklame, og derfor markerer vi det tydeligt:</p>
      <ul>
        <li>Sider med reklamelinks har en boks øverst, der siger det, før du læser videre.</li>
        <li>Hvert reklamelink er mærket <strong>&quot;Reklamelink&quot;</strong> lige ved siden af knappen.</li>
        <li>På sociale medier og i nyhedsbrevet markerer vi opslag og mails med reklamelinks som reklame.</li>
      </ul>
      <p>Provisionen ændrer ikke prisen for dig. Den ændrer heller ikke vores vurderinger: Et softwarefirma kan ikke betale for at blive anbefalet, og vi anbefaler også produkter, vi ikke tjener på.</p>
      <h2>Firmaer og netværk vi samarbejder med</h2>
      {active.length === 0 ? (
        <p>Vi har i øjeblikket ingen aktive provisionsaftaler. Alle links på siden er almindelige links uden provision.</p>
      ) : (
        <ul>{active.map((p) => <li key={p.id}>{p.name} (via {p.network})</li>)}</ul>
      )}
      <p>Linket sender dig via driftig.dk/go/…, så vi kan tælle, hvor mange der klikker videre. Vi gemmer ikke din IP-adresse eller andet, der kan identificere dig. Firmaet eller netværket sætter selv en cookie, når du lander hos dem, så de kan se, at du kom fra os. Det er reguleret af deres privatlivspolitik.</p>
    </TextPage>
  );
}
