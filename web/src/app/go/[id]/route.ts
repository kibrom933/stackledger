import { NextResponse, type NextRequest } from "next/server";
import { buildOutboundUrl, productById } from "@/lib/partners";
import { serverDb } from "@/lib/supabase";

/**
 * Outbound redirect. Logs an anonymous click (no IP, no user agent, no cookies) so we can
 * attribute partner revenue to pages, then sends the reader to the merchant.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const product = productById((await params).id);
  if (!product) return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  const { url, affiliate } = buildOutboundUrl(product);
  const from = req.nextUrl.searchParams.get("from")?.slice(0, 120) ?? null;
  const db = serverDb();
  if (db) {
    // Do not block the redirect on analytics; errors are logged, not shown.
    const { error } = await db.from("outbound_clicks").insert({
      product_id: product.id, partner_id: product.partnerId, page_slug: from, affiliate,
      channel: req.nextUrl.searchParams.get("utm_source")?.slice(0, 40) ?? "site",
    });
    if (error) console.error("click log failed", error.message);
  }
  return NextResponse.redirect(url, { status: 302, headers: { "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" } });
}
