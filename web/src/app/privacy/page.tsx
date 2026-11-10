import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { company } from "@/lib/company";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", description: "What data Stackledger processes, why, for how long, and your rights under the GDPR." };

export default function Privacy() {
  return (
    <TextPage title="Privacy policy" updated="10 November 2026">
      <p>Data controller: {company.name}, CVR {company.cvr}, {company.address}, Denmark. Contact: {site.contactEmail}.</p>
      <h2>What we process</h2>
      <table>
        <thead><tr><th>Purpose</th><th>Data</th><th>Legal basis (GDPR)</th><th>Retention</th></tr></thead>
        <tbody>
          <tr><td>Newsletter</td><td>Email address, time and wording of your consent</td><td>Consent, Art. 6(1)(a)</td><td>Until you unsubscribe; then the address is deleted at once. Unconfirmed sign-ups are deleted after 30 days.</td></tr>
          <tr><td>Visitor statistics</td><td>Anonymous aggregate figures (page views, referrer, country, device type) via Plausible Analytics. No cookies; no IP addresses stored.</td><td>Legitimate interest, Art. 6(1)(f), in improving the site</td><td>Aggregates only</td></tr>
          <tr><td>Clicks on affiliate links</td><td>Which tool, which page, when. Nothing about you.</td><td>Not personal data</td><td>24 months</td></tr>
          <tr><td>Emails you send us</td><td>What you write</td><td>Legitimate interest</td><td>Up to 12 months</td></tr>
        </tbody>
      </table>
      <h2>Processors</h2>
      <p>Hosting (Vercel), database (Supabase, EU region), email delivery (Resend) and statistics (Plausible, EU). We have data processing agreements with each. Transfers outside the EU/EEA rely on the European Commission&apos;s standard contractual clauses or the EU-US Data Privacy Framework.</p>
      <h2>Your rights</h2>
      <p>You can request access, correction, deletion, restriction and portability, object to processing, and withdraw consent at any time. You can complain to the Danish Data Protection Agency (Datatilsynet) or your local authority.</p>
    </TextPage>
  );
}
