"""Import commission reports exported from networks (CSV) into the commissions table.

Each network exports different columns, so mapping lives here. Add an API client per network
once the account is approved and API access is granted; until then, CSV export is the
reliable, terms-compliant route. Amounts are stored in DKK for the books: pass --usd-dkk to convert USD exports.
"""
from __future__ import annotations

import csv
from pathlib import Path

from . import db

STATUS_MAP = {
    "pending": "pending", "afventer": "pending", "open": "pending",
    "approved": "confirmed", "godkendt": "confirmed", "confirmed": "confirmed", "locked": "confirmed",
    "declined": "rejected", "rejected": "rejected", "afvist": "rejected", "cancelled": "rejected",
    "paid": "paid", "udbetalt": "paid", "due": "confirmed", "unpaid": "confirmed", "voided": "rejected", "refunded": "rejected",
}

# network -> {our column: their column}
MAPPINGS: dict[str, dict[str, str]] = {
    "partner-ads": {"id": "Ordre ID", "date": "Dato", "status": "Status", "amount": "Provision", "order_value": "Ordresum", "program": "Program", "subid": "UID"},
    "partnerstack": {"id": "Transaction ID", "date": "Created", "status": "Status", "amount": "Commission", "order_value": "Amount", "program": "Company", "subid": "Sub ID"},
    # Column names below follow each platform's CSV export; confirm against a real export before the first import.
    "rewardful": {"id": "id", "date": "created_at", "status": "state", "amount": "amount", "order_value": "sale_amount", "program": "campaign", "subid": "sub_id"},
    "firstpromoter": {"id": "ID", "date": "Created at", "status": "Status", "amount": "Amount", "order_value": "Sale amount", "program": "Campaign", "subid": "Sub ID"},
}


def _num(s: str | None) -> float | None:
    if not s:
        return None
    return float(s.replace(".", "").replace(",", ".")) if "," in s else float(s)


def parse(network: str, path: Path, partner_lookup: dict[str, str], fx: float = 1.0) -> list[dict]:
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
                "transaction_date": r[m["date"]][:10], "status": status, "amount_dkk": round((_num(r[m["amount"]]) or 0) * fx, 2),
                "order_value_dkk": round(v * fx, 2) if (v := _num(r.get(m["order_value"]))) is not None else None, "page_slug": page or None, "channel": channel or None,
            })
    return rows


def import_csv(network: str, path: Path, partner_lookup: dict[str, str], fx: float = 1.0) -> int:
    rows = parse(network, path, partner_lookup, fx)
    db.upsert("commissions", rows, on_conflict="network,network_transaction_id")
    return len(rows)
