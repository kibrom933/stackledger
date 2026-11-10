import { NextResponse, type NextRequest } from "next/server";
import { serverDb } from "@/lib/supabase";
import { hashToken } from "@/lib/newsletter";

/** One-click unsubscribe (GET from the email link, POST for RFC 8058 List-Unsubscribe-Post). Deletes the email entirely. */
async function handle(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const db = serverDb();
  if (token && db) await db.from("subscribers").delete().eq("unsubscribe_token_hash", hashToken(token));
  return NextResponse.redirect(new URL("/newsletter?status=unsubscribed", req.url), 303);
}
export const GET = handle;
export const POST = handle;
