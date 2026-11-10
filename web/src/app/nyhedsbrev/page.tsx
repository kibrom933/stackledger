import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Nyhedsbrev", description: "Ét brev om måneden med frister, nye guides og prisændringer på software til små virksomheder." };

const messages: Record<string, string> = {
  bekraeftet: "Tak! Din tilmelding er bekræftet.",
  afmeldt: "Du er afmeldt, og vi har slettet din e-mail.",
  fejl: "Linket virker ikke længere. Prøv at tilmelde dig igen.",
};

export default async function NewsletterPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const status = (await searchParams).status;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold">Nyhedsbrevet</h1>
      {status && messages[status] && <p role="status" className="mt-6 rounded-xl bg-forest-soft p-4 font-medium text-forest">{messages[status]}</p>}
      <p className="mt-6 text-lg text-muted">Én mail om måneden: kommende frister fra SKAT og Erhvervsstyrelsen, nye guides og prisændringer på de programmer, vi dækker. Nogle mails indeholder reklamelinks, og de er altid markeret.</p>
      <div className="mt-8"><NewsletterForm /></div>
    </div>
  );
}
