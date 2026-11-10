import { createHash, randomBytes } from "node:crypto";

export const CONSENT_TEXT =
  "Ja tak, send mig Driftigs nyhedsbrev. Det kan indeholde reklamelinks. Jeg kan altid afmelde.";

export const newToken = () => randomBytes(24).toString("base64url");
export const hashToken = (t: string) => createHash("sha256").update(t).digest("hex");

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!key || !from) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) console.error("email send failed", res.status, await res.text());
  return res.ok;
}
