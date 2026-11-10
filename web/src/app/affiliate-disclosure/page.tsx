import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { partners, isAffiliateActive } from "@/lib/partners";

export const metadata: Metadata = { title: "Affiliate disclosure", description: "Which companies pay us commission, and how we label affiliate links." };

export default function Disclosure() {
  const active = partners.filter(isAffiliateActive);
  return (
    <TextPage title="Affiliate disclosure" updated="10 November 2026">
      <p>Stackledger is free to read because some vendors pay us a commission when someone signs up or buys through our links. That is advertising, so we label it clearly:</p>
      <ul>
        <li>Pages with affiliate links show a disclosure box at the top, before you start reading.</li>
        <li>Every commissioned button is labelled <strong>&quot;Affiliate link (ad)&quot;</strong> right next to it.</li>
        <li>Social posts and newsletters that contain affiliate links are marked as advertising.</li>
      </ul>
      <p>The commission does not change your price. It does not change our verdicts either: vendors cannot pay for a recommendation, and we also recommend tools we earn nothing from.</p>
      <h2>Companies that currently pay us commission</h2>
      {active.length === 0 ? (
        <p>We have no active affiliate agreements right now. Every link on the site is a plain link with no commission.</p>
      ) : (
        <ul>{active.map((p) => <li key={p.id}>{p.name} (via {p.network})</li>)}</ul>
      )}
      <p>Links go through stackledger.com/go/… so we can count clicks per page. We do not store your IP address or anything else that identifies you. The vendor or its affiliate platform sets its own cookie when you arrive, under its own privacy policy, so it can see that you came from us.</p>
    </TextPage>
  );
}
