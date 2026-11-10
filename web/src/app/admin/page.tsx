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
      <h1 className="font-display text-3xl font-semibold">Drift: de seneste 30 dage</h1>
      {!d.configured && <p className="mt-4 rounded-lg bg-ochre-soft p-4 text-sm">Supabase er ikke sat op endnu (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Tallene er tomme.</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Besøgende" value={d.visitors30d?.toLocaleString("da-DK") ?? "–"} note={d.visitors30d === null ? "Plausible ikke forbundet" : undefined} />
        <Tile label="Klik på reklamelinks" value={d.clicks30d.toLocaleString("da-DK")} note={ctr !== null ? `${ctr.toFixed(1)} % af besøgende` : undefined} />
        <Tile label="Bekræftet + udbetalt provision" value={dkk(earned)} note="Kun tal, netværket har godkendt" />
        <Tile label="Netto (måned til dato)" value={dkk(earned - d.expensesMonth)} note={`Udgifter: ${dkk(d.expensesMonth)}`} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Tile label="Estimeret (ikke godkendt)" value={dkk(amount("pending"))} note="Kan blive annulleret" />
        <Tile label="Afvist" value={dkk(amount("rejected"))} />
        <Tile label="Nyhedsbrev, bekræftede" value={String(d.subscribers)} />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Table title="Klik pr. side" rows={d.clicksByPage.map((r) => [r.key, String(r.n)])} />
        <Table title="Klik pr. partner" rows={d.clicksByPartner.map((r) => [r.key, String(r.n)])} />
        <Table title="Klik pr. kanal" rows={d.clicksByChannel.map((r) => [r.key, String(r.n)])} />
        <Table title="Indtjening pr. partner" rows={d.revenueByPartner.map((r) => [r.key, dkk(r.amount)])} />
        <Table title="Indtjening pr. side" rows={d.revenueByPage.map((r) => [r.key, dkk(r.amount)])} />
        <Table title="Partnerstatus" rows={partners.map((p) => [p.name, p.applicationStatus])} />
      </div>
    </div>
  );
}

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="font-medium">{title}</p>
      {rows.length === 0 ? <p className="mt-3 text-sm text-muted">Ingen data endnu.</p> : (
        <table className="mt-3 w-full text-sm">
          <tbody>{rows.map(([a, b]) => <tr key={a} className="border-t border-line"><td className="py-1.5 pr-2">{a}</td><td className="py-1.5 text-right tabular-nums">{b}</td></tr>)}</tbody>
        </table>
      )}
    </div>
  );
}
