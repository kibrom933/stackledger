import { NextResponse } from "next/server";
import { z } from "zod";
import { serverDb } from "@/lib/supabase";
import { CONSENT_TEXT, hashToken, newToken, sendEmail } from "@/lib/newsletter";
import { site } from "@/lib/site";

const Body = z.object({ email: z.string().email().max(254), consent: z.literal(true), website: z.string().optional().nullable() });

/** Double opt-in signup. Stores only email, consent text and timestamps (data minimisation). */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Udfyld en gyldig e-mail og sæt flueben." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Tak!" }); // honeypot hit: pretend success
  const db = serverDb();
  if (!db) return NextResponse.json({ message: "Nyhedsbrevet åbner snart. Prøv igen om lidt." }, { status: 503 });

  const email = parsed.data.email.trim().toLowerCase();
  const confirm = newToken();
  const unsubscribe = newToken();
  const { error } = await db.from("subscribers").upsert(
    { email, status: "pending", consent_text: CONSENT_TEXT, consent_at: new Date().toISOString(),
      confirm_token_hash: hashToken(confirm), unsubscribe_token_hash: hashToken(unsubscribe) },
    { onConflict: "email", ignoreDuplicates: false },
  );
  if (error) { console.error(error.message); return NextResponse.json({ message: "Noget gik galt." }, { status: 500 }); }

  const link = `${site.url}/api/newsletter/confirm?token=${confirm}`;
  const sent = await sendEmail(email, "Bekræft din tilmelding til Driftig",
    `<p>Hej!</p><p>Klik her for at bekræfte, at du vil have Driftigs nyhedsbrev:</p><p><a href="${link}">Bekræft tilmelding</a></p><p>Har du ikke bedt om det, kan du bare ignorere mailen. Så sker der ingenting.</p>`);
  if (!sent && process.env.NODE_ENV !== "production") console.info("[dev] confirm link:", link);
  return NextResponse.json({ message: "Tjek din indbakke og bekræft tilmeldingen." });
}
