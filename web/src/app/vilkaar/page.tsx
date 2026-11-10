import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { company } from "@/lib/company";

export const metadata: Metadata = { title: "Vilkår", description: "Vilkår for brug af Driftig.dk." };

export default function Terms() {
  return (
    <TextPage title="Vilkår for brug" updated="10. november 2026">
      <p>Driftig.dk drives af {company.name} (CVR {company.cvr}).</p>
      <h2>Indholdet er vejledning, ikke rådgivning</h2>
      <p>Vores guides er generel information. De erstatter ikke rådgivning fra en revisor eller advokat om netop din virksomhed.</p>
      <h2>Priser og vilkår</h2>
      <p>Priser, funktioner og vilkår kommer fra softwarefirmaerne og kan ændre sig. Det er firmaets oplysninger, når du opretter dig, der gælder. Aftalen indgår du med firmaet, ikke med os.</p>
      <h2>Ophavsret</h2>
      <p>Tekst og egne billeder tilhører Driftig. Du må gerne citere kortere uddrag med kildeangivelse og link.</p>
    </TextPage>
  );
}
