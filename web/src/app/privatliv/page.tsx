import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { company } from "@/lib/company";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privatlivspolitik", description: "Hvilke data Driftig behandler, hvorfor, og hvilke rettigheder du har." };

export default function Privacy() {
  return (
    <TextPage title="Privatlivspolitik" updated="10. november 2026">
      <p>Dataansvarlig: {company.name}, CVR {company.cvr}, {company.address}. Kontakt: {site.contactEmail}.</p>
      <h2>Hvad vi behandler</h2>
      <table>
        <thead><tr><th>Formål</th><th>Data</th><th>Retsgrundlag</th><th>Opbevaring</th></tr></thead>
        <tbody>
          <tr><td>Nyhedsbrev</td><td>E-mail, tidspunkt og tekst for dit samtykke</td><td>Samtykke (GDPR art. 6(1)(a))</td><td>Til du afmelder. Så sletter vi e-mailen med det samme. Ubekræftede tilmeldinger slettes efter 30 dage.</td></tr>
          <tr><td>Besøgsstatistik</td><td>Anonyme, samlede tal (sidevisninger, henvisende side, land, enhedstype) via Plausible Analytics. Ingen cookies og ingen IP-adresser gemmes.</td><td>Legitim interesse (art. 6(1)(f)) i at forbedre siden</td><td>Samlede tal uden personhenførbare oplysninger</td></tr>
          <tr><td>Klik på reklamelinks</td><td>Hvilket produkt, hvilken side og tidspunkt. Intet om dig.</td><td>Ikke personoplysninger</td><td>24 måneder</td></tr>
          <tr><td>Henvendelser</td><td>Det du skriver til os</td><td>Legitim interesse</td><td>Op til 12 måneder</td></tr>
        </tbody>
      </table>
      <h2>Databehandlere</h2>
      <p>Hosting (Vercel), database (Supabase, EU-region), e-mail (Resend) og statistik (Plausible, EU). Vi har databehandleraftaler med dem. Hvis data overføres uden for EU/EØS, sker det på grundlag af EU-Kommissionens standardkontraktbestemmelser eller EU-US Data Privacy Framework.</p>
      <h2>Dine rettigheder</h2>
      <p>Du har ret til indsigt, berigtigelse, sletning, begrænsning, dataportabilitet og indsigelse, og du kan altid trække dit samtykke tilbage. Du kan klage til Datatilsynet (datatilsynet.dk).</p>
    </TextPage>
  );
}
