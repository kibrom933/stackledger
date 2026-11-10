import { serverDb } from "./supabase";

export type Dashboard = {
  configured: boolean;
  visitors30d: number | null;
  clicks30d: number;
  clicksByPage: { key: string; n: number }[];
  clicksByPartner: { key: string; n: number }[];
  clicksByChannel: { key: string; n: number }[];
  commissions: { status: string; amount: number }[];
  revenueByPartner: { key: string; amount: number }[];
  revenueByPage: { key: string; amount: number }[];
  expensesMonth: number;
  subscribers: number;
};

const top = (rows: Record<string, unknown>[], k: string) => {
  const m = new Map<string, number>();
  for (const r of rows) { const key = String(r[k] ?? "unknown"); m.set(key, (m.get(key) ?? 0) + 1); }
  return [...m].map(([key, n]) => ({ key, n })).sort((a, b) => b.n - a.n).slice(0, 10);
};
const sumBy = (rows: { amount_dkk: number }[] & Record<string, unknown>[], k: string) => {
  const m = new Map<string, number>();
  for (const r of rows) { const key = String(r[k] ?? "unknown"); m.set(key, (m.get(key) ?? 0) + Number(r.amount_dkk)); }
  return [...m].map(([key, amount]) => ({ key, amount })).sort((a, b) => b.amount - a.amount).slice(0, 10);
};

async function plausibleVisitors(): Promise<number | null> {
  const key = process.env.PLAUSIBLE_API_KEY, site = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!key || !site) return null;
  const res = await fetch(`https://plausible.io/api/v1/stats/aggregate?site_id=${site}&period=30d&metrics=visitors`, {
    headers: { authorization: `Bearer ${key}` }, next: { revalidate: 900 },
  });
  if (!res.ok) return null;
  return (await res.json()).results?.visitors?.value ?? null;
}

export async function loadDashboard(): Promise<Dashboard> {
  const db = serverDb();
  const empty: Dashboard = { configured: false, visitors30d: null, clicks30d: 0, clicksByPage: [], clicksByPartner: [], clicksByChannel: [], commissions: [], revenueByPartner: [], revenueByPage: [], expensesMonth: 0, subscribers: 0 };
  if (!db) return empty;
  const since = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);
  const [clicks, comm, exp, subs, visitors] = await Promise.all([
    db.from("outbound_clicks").select("page_slug, partner_id, channel").gte("created_at", since).limit(50_000),
    db.from("commissions").select("status, amount_dkk, partner_id, page_slug").gte("transaction_date", since.slice(0, 10)),
    db.from("expenses").select("amount_dkk").gte("incurred_on", monthStart),
    db.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
    plausibleVisitors(),
  ]);
  const c = clicks.data ?? [];
  const cm = (comm.data ?? []) as never[];
  const byStatus = new Map<string, number>();
  for (const r of comm.data ?? []) byStatus.set(r.status, (byStatus.get(r.status) ?? 0) + Number(r.amount_dkk));
  const earned = (cm as { status: string }[]).filter((r) => r.status === "confirmed" || r.status === "paid") as never[];
  return {
    configured: true, visitors30d: visitors, clicks30d: c.length,
    clicksByPage: top(c, "page_slug"), clicksByPartner: top(c, "partner_id"), clicksByChannel: top(c, "channel"),
    commissions: [...byStatus].map(([status, amount]) => ({ status, amount })),
    revenueByPartner: sumBy(earned, "partner_id"), revenueByPage: sumBy(earned, "page_slug"),
    expensesMonth: (exp.data ?? []).reduce((s, r) => s + Number(r.amount_dkk), 0),
    subscribers: subs.count ?? 0,
  };
}
