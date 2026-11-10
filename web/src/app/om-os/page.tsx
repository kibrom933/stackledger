import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "Sådan arbejder vi", description: "Driftigs redaktionelle principper: hvordan vi tester, hvilke kilder vi bruger, brug af AI og hvordan vi tjener penge." };

export default function About() {
  return (
    <TextPage title="Sådan arbejder vi" updated="10. november 2026">
      <p>Driftig hjælper selvstændige og små virksomheder i Danmark med at vælge software til regnskab, fakturering, salg, webshop og AI. Vores løfte er enkelt: Vi skriver kun det, vi kan dokumentere.</p>
      <h2>Sådan tester vi</h2>
      <ul>
        <li><strong>Egne prøvekonti.</strong> Når vi skriver &quot;vi har testet&quot;, har vi oprettet en konto og gennemført de opgaver, vi beskriver. Skærmbillederne er fra vores egne konti.</li>
        <li><strong>Ingen opdigtede tests.</strong> Har vi ikke selv prøvet et program, står det tydeligt, og vi bygger kun på producentens dokumentation og andre kilder.</li>
        <li><strong>Priser med dato.</strong> Priser ændrer sig. Vi viser kun priser, vi har tjekket inden for de seneste 14 dage, med datoen ved siden af.</li>
        <li><strong>Regler fra kilden.</strong> Krav fra fx bogføringsloven bygger på Erhvervsstyrelsen, SKAT og lovteksten. Vi giver overblik, ikke juridisk rådgivning. Spørg din revisor, hvis du er i tvivl om din situation.</li>
        <li><strong>Rettelser.</strong> Finder du en fejl, retter vi den og skriver, hvad der er ændret.</li>
      </ul>
      <h2>Hvordan bruger vi AI?</h2>
      <p>Vi bruger AI-værktøjer til research, struktur og første udkast. Hver artikel bliver faktatjekket mod kilderne og godkendt af et menneske, før den udgives. AI skriver aldrig &quot;egne erfaringer&quot; på vores vegne.</p>
      <h2>Hvordan tjener vi penge?</h2>
      <p>Nogle links er reklamelinks: Opretter du en konto eller køber via dem, får vi provision fra softwarefirmaet. Det koster ikke dig noget ekstra. Ingen kan betale sig til en bedre placering eller en bedre vurdering, og vi anbefaler også programmer, vi ikke tjener på. Se <a href="/annoncering">reklamelinks og provision</a>.</p>
    </TextPage>
  );
}
