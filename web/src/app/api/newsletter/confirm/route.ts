import { NextResponse, type NextRequest } from "next/server";
import { serverDb } from "@/lib/supabase";
import { hashToken } from "@/lib/newsletter";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const db = serverDb();
  if (!token || !db) return NextResponse.redirect(new URL("/nyhedsbrev?status=fejl", req.url));
  const { data, error } = await db.from("subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString(), confirm_token_hash: null })
    .eq("confirm_token_hash", hashToken(token)).select("id");
  const ok = !error && data && data.length > 0;
  return NextResponse.redirect(new URL(`/nyhedsbrev?status=${ok ? "bekraeftet" : "fejl"}`, req.url));
}
