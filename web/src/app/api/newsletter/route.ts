import { NextResponse } from "next/server";
import { z } from "zod";
import { serverDb } from "@/lib/supabase";
import { CONSENT_TEXT, hashToken, newToken, sendEmail } from "@/lib/newsletter";
import { site } from "@/lib/site";

const Body = z.object({ email: z.string().email().max(254), consent: z.literal(true), website: z.string().optional().nullable() });

/** Double opt-in signup. Stores only email, consent text and timestamps (data minimisation). */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Enter a valid email and tick the box." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Thanks!" }); // honeypot hit: pretend success
  const db = serverDb();
  if (!db) return NextResponse.json({ message: "The newsletter opens soon. Please try again later." }, { status: 503 });

  const email = parsed.data.email.trim().toLowerCase();
  const confirm = newToken();
  const unsubscribe = newToken();
  const { error } = await db.from("subscribers").upsert(
    { email, status: "pending", consent_text: CONSENT_TEXT, consent_at: new Date().toISOString(),
      confirm_token_hash: hashToken(confirm), unsubscribe_token_hash: hashToken(unsubscribe) },
    { onConflict: "email", ignoreDuplicates: false },
  );
  if (error) { console.error(error.message); return NextResponse.json({ message: "Something went wrong." }, { status: 500 }); }

  const link = `${site.url}/api/newsletter/confirm?token=${confirm}`;
  const sent = await sendEmail(email, "Confirm your Stackledger subscription",
    `<p>Hi!</p><p>Click to confirm that you want Stackledger's monthly newsletter:</p><p><a href="${link}">Confirm subscription</a></p><p>If you did not ask for this, ignore this email and nothing will happen.</p>`);
  if (!sent && process.env.NODE_ENV !== "production") console.info("[dev] confirm link:", link);
  return NextResponse.json({ message: "Check your inbox and confirm your subscription." });
}
