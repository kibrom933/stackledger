"""Weekly operating report and refresh/retire recommendations, written as Markdown to /reports.

It separates estimated (pending) from confirmed and paid commissions, and ranks pages by
money earned, not by clicks or impressions.
"""
from __future__ import annotations

from collections import Counter, defaultdict
from datetime import date, timedelta
from pathlib import Path

import frontmatter

from . import db
from .config import CONTENT_DIR, REPORTS_DIR


def refresh_candidates(perf: list[dict], today: date | None = None) -> list[dict]:
    """Pages ranking 5-20 with real impressions are the cheapest wins; old pages get a freshness check."""
    today = today or date.today()
    agg: dict[str, dict] = defaultdict(lambda: {"impressions": 0, "clicks": 0, "pos_x_imp": 0.0})
    for r in perf:
        a = agg[r["page"]]
        a["impressions"] += r["impressions"]
        a["clicks"] += r["clicks"]
        a["pos_x_imp"] += r["position"] * r["impressions"]
    out = []
    for page, a in agg.items():
        if a["impressions"] < 100:
            continue
        pos = a["pos_x_imp"] / a["impressions"]
        ctr = a["clicks"] / a["impressions"]
        if 5 <= pos <= 20:
            out.append({"page": page, "reason": f"avg position {pos:.1f} with {a['impressions']} impressions: improve depth/intent match", "priority": a["impressions"] / pos})
        elif pos < 5 and ctr < 0.02:
            out.append({"page": page, "reason": f"ranks {pos:.1f} but CTR {ctr:.1%}: rewrite title/description", "priority": a["impressions"]})
    for p in CONTENT_DIR.glob("*.md"):
        meta = frontmatter.load(p).metadata
        updated = meta.get("updated")
        if updated and meta.get("status") == "published" and (today - date.fromisoformat(str(updated))).days > 180:
            out.append({"page": p.stem, "reason": "not updated for 180+ days: re-check prices, plans and rules", "priority": 50})
    return sorted(out, key=lambda x: x["priority"], reverse=True)


def weekly(today: date | None = None) -> Path:
    today = today or date.today()
    since = (today - timedelta(days=7)).isoformat()
    clicks = db.select("outbound_clicks", f"select=page_slug,partner_id,channel&created_at=gte.{since}")
    comm = db.select("commissions", f"select=status,amount_dkk,partner_id,page_slug,channel&transaction_date=gte.{since}")
    jobs = db.select("job_runs", f"select=job,ok,started_at&started_at=gte.{since}")
    approvals = db.select("approvals", "select=kind,subject,created_at&status=eq.open")
    perf = db.select("search_performance", f"select=page,query,clicks,impressions,position&day=gte.{(today - timedelta(days=28)).isoformat()}")

    by_status = Counter()
    by_page = Counter()
    for c in comm:
        by_status[c["status"]] += float(c["amount_dkk"])
        if c["status"] in ("confirmed", "paid"):
            by_page[c.get("page_slug") or "ukendt"] += float(c["amount_dkk"])
    lines = [f"# Ugerapport {today.isoformat()}", ""]
    if not db.configured():
        lines += ["> Supabase er ikke forbundet: rapporten er tom. Sæt SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY.", ""]
    lines += [
        "## Penge (seneste 7 dage, efter transaktionsdato)",
        f"- Estimeret (afventer netværk): {by_status['pending']:,.0f} kr",
        f"- Bekræftet: {by_status['confirmed']:,.0f} kr",
        f"- Udbetalt: {by_status['paid']:,.0f} kr",
        f"- Afvist: {by_status['rejected']:,.0f} kr",
        "", "## Klik på reklamelinks", f"- I alt: {len(clicks)}",
        *[f"- {k}: {v}" for k, v in Counter(c['page_slug'] for c in clicks).most_common(10)],
        "", "## Sider der tjener penge (bekræftet + udbetalt)",
        *([f"- {k}: {v:,.0f} kr" for k, v in by_page.most_common(10)] or ["- Ingen endnu."]),
        "", "## Forslag til opdatering",
        *([f"- **{r['page']}**: {r['reason']}" for r in refresh_candidates(perf, today)[:10]] or ["- Ingen."]),
        "", "## Afventer din beslutning",
        *([f"- [{a['kind']}] {a['subject']}" for a in approvals] or ["- Intet."]),
        "", "## Jobs",
        f"- Kørsler: {len(jobs)}, fejlede: {sum(1 for j in jobs if not j.get('ok'))}",
    ]
    REPORTS_DIR.mkdir(exist_ok=True)
    out = REPORTS_DIR / f"weekly-{today.isoformat()}.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return out
