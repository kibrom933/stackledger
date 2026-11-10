"""Import commission reports exported from networks (CSV) into the commissions table.

Each network exports different columns, so mapping lives here. Add an API client per network
once the account is approved and API access is granted; until then, CSV export is the
reliable, terms-compliant route. Amounts are stored in DKK as reported (convert before import
if the network pays in another currency).
"""
from __future__ import annotations

import csv
from pathlib import Path

from . import db

STATUS_MAP = {
    "pending": "pending", "afventer": "pending", "open": "pending",
    "approved": "confirmed", "godkendt": "confirmed", "confirmed": "confirmed", "locked": "confirmed",
    "declined": "rejected", "rejected": "rejected", "afvist": "rejected", "cancelled": "rejected",
    "paid": "paid", "udbetalt": "paid",
}

# network -> {our column: their column}
MAPPINGS: dict[str, dict[str, str]] = {
    "partner-ads": {"id": "Ordre ID", "date": "Dato", "status": "Status", "amount": "Provision", "order_value": "Ordresum", "program": "Program", "subid": "UID"},
    "partnerstack": {"id": "Transaction ID", "date": "Created", "status": "Status", "amount": "Commission", "order_value": "Amount", "program": "Company", "subid": "Sub ID"},
}


def _num(s: str | None) -> float | None:
    if not s:
        return None
    return float(s.replace(".", "").replace(",", ".")) if "," in s else float(s)


def parse(network: str, path: Path, partner_lookup: dict[str, str]) -> list[dict]:
    m = MAPPINGS[network]
    rows = []
    with path.open(newline="", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            status = STATUS_MAP.get((r.get(m["status"]) or "").strip().lower())
            if not status:
                raise ValueError(f"Unknown status {r.get(m['status'])!r}; add it to STATUS_MAP")
            subid = (r.get(m["subid"]) or "").strip()
            page, _, channel = subid.partition("~")  # we set subid = "<page-slug>~<channel>" in tracking links
            rows.append({
                "network": network, "network_transaction_id": r[m["id"]].strip(),
                "partner_id": partner_lookup.get(r.get(m["program"], "").strip().lower(), r.get(m["program"], "").strip().lower()),
                "transaction_date": r[m["date"]][:10], "status": status, "amount_dkk": _num(r[m["amount"]]),
                "order_value_dkk": _num(r.get(m["order_value"])), "page_slug": page or None, "channel": channel or None,
            })
    return rows


def import_csv(network: str, path: Path, partner_lookup: dict[str, str]) -> int:
    rows = parse(network, path, partner_lookup)
    db.upsert("commissions", rows, on_conflict="network,network_transaction_id")
    return len(rows)
