import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "Cookies", description: "Driftig sætter ingen cookies. Her kan du læse hvorfor, og hvad der sker, når du klikker videre til et softwarefirma." };

export default function Cookies() {
  return (
    <TextPage title="Cookies" updated="10. november 2026">
      <p><strong>Driftig.dk sætter ingen cookies</strong> og gemmer ikke andre oplysninger på din enhed. Derfor viser vi ikke et cookie-banner.</p>
      <p>Vores besøgsstatistik (Plausible) virker uden cookies og uden at gemme din IP-adresse.</p>
      <h2>Når du klikker videre til et softwarefirma</h2>
      <p>Klikker du på et reklamelink, sender vi dig videre til firmaet. Firmaet eller affiliate-netværket (fx Partner-ads eller PartnerStack) sætter så deres egen cookie på deres eget domæne, så de kan registrere, at et eventuelt køb kom fra os. Den cookie er omfattet af firmaets og netværkets cookiepolitik, og du giver dit samtykke hos dem.</p>
      <p>Tilføjer vi senere noget, der sætter cookies (fx en video fra YouTube), spørger vi om lov først, og du kan altid trække samtykket tilbage her på siden.</p>
    </TextPage>
  );
}
