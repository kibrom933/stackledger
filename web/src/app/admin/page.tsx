import type { Metadata } from "next";
import { loadDashboard } from "@/lib/metrics";
import { partners } from "@/lib/partners";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const dkk = (n: number) => n.toLocaleString("da-DK", { style: "currency", currency: "DKK", maximumFractionDigits: 0 });

export default async function Admin() {
  const d = await loadDashboard();
  const amount = (s: string) => d.commissions.find((c) => c.status === s)?.amount ?? 0;
  const earned = amount("confirmed") + amount("paid");
  const ctr = d.visitors30d ? (d.clicks30d / d.visitors30d) * 100 : null;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold">Operations: last 30 days</h1>
      {!d.configured && <p className="mt-4 rounded-lg bg-accent-soft p-4 text-sm">Supabase is not configured yet (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Numbers are empty.</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Visitors" value={d.visitors30d?.toLocaleString("da-DK") ?? "–"} note={d.visitors30d === null ? "Plausible not connected" : undefined} />
        <Tile label="Affiliate link clicks" value={d.clicks30d.toLocaleString("da-DK")} note={ctr !== null ? `${ctr.toFixed(1)} % of visitors` : undefined} />
        <Tile label="Confirmed + paid commission" value={dkk(earned)} note="Only what networks have approved" />
        <Tile label="Net (month to date)" value={dkk(earned - d.expensesMonth)} note={`Expenses: ${dkk(d.expensesMonth)}`} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Tile label="Estimated (pending)" value={dkk(amount("pending"))} note="May still be reversed" />
        <Tile label="Rejected" value={dkk(amount("rejected"))} />
        <Tile label="Newsletter, confirmed" value={String(d.subscribers)} />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Table title="Clicks by page" rows={d.clicksByPage.map((r) => [r.key, String(r.n)])} />
        <Table title="Clicks by partner" rows={d.clicksByPartner.map((r) => [r.key, String(r.n)])} />
        <Table title="Clicks by channel" rows={d.clicksByChannel.map((r) => [r.key, String(r.n)])} />
        <Table title="Earnings by partner" rows={d.revenueByPartner.map((r) => [r.key, dkk(r.amount)])} />
        <Table title="Earnings by page" rows={d.revenueByPage.map((r) => [r.key, dkk(r.amount)])} />
        <Table title="Partner status" rows={partners.map((p) => [p.name, p.applicationStatus])} />
      </div>
    </div>
  );
}

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border border-line p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="rounded-md border border-line p-5">
      <p className="font-medium">{title}</p>
      {rows.length === 0 ? <p className="mt-3 text-sm text-muted">No data yet.</p> : (
        <table className="mt-3 w-full text-sm">
          <tbody>{rows.map(([a, b]) => <tr key={a} className="border-t border-line"><td className="py-1.5 pr-2">{a}</td><td className="py-1.5 text-right tabular-nums">{b}</td></tr>)}</tbody>
        </table>
      )}
    </div>
  );
}
