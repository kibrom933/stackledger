"""Tiny PostgREST client for Supabase. Every function is a no-op (returns []) when not configured."""
from __future__ import annotations

from typing import Any

import httpx

from .config import SUPABASE_KEY, SUPABASE_URL


def configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY or "", "authorization": f"Bearer {SUPABASE_KEY}", "content-type": "application/json"}


def select(table: str, query: str = "select=*") -> list[dict[str, Any]]:
    if not configured():
        return []
    r = httpx.get(f"{SUPABASE_URL}/rest/v1/{table}?{query}", headers=_headers(), timeout=30)
    r.raise_for_status()
    return r.json()


def upsert(table: str, rows: list[dict[str, Any]], on_conflict: str) -> None:
    if not configured() or not rows:
        return
    h = _headers() | {"prefer": "resolution=merge-duplicates"}
    r = httpx.post(f"{SUPABASE_URL}/rest/v1/{table}?on_conflict={on_conflict}", headers=h, json=rows, timeout=60)
    r.raise_for_status()


def insert(table: str, row: dict[str, Any]) -> None:
    if not configured():
        return
    r = httpx.post(f"{SUPABASE_URL}/rest/v1/{table}", headers=_headers(), json=row, timeout=30)
    r.raise_for_status()
