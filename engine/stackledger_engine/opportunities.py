"""Score keyword/topic opportunities from data we actually have.

Input: a CSV export from a keyword tool or Google Search Console with at least a `keyword`
column. Optional columns: volume, difficulty (0-100), intent, season, volume_source.
Unknown volume stays unknown: it is never guessed, and such rows are ranked by intent only.
"""
from __future__ import annotations

import csv
import math
from dataclasses import dataclass
from pathlib import Path

COMMERCIAL_HINTS = ("best", " vs ", "review", "pricing", "price", "alternative", "alternatives", "compare", "comparison", "cheap", "free", "discount", "tool", "software", "app")
INFO_HINTS = ("how to", "how do", "what is", "why", "when", "is it legal", "gdpr", "ai act", "rules", "guide")
INTENT_WEIGHT = {"transactional": 1.0, "commercial": 0.9, "informational": 0.45, "navigational": 0.1}


@dataclass
class Opportunity:
    keyword: str
    intent: str
    monthly_volume: int | None
    volume_source: str | None
    difficulty: float | None
    season: str | None
    score: float


def classify_intent(keyword: str) -> str:
    k = keyword.lower()
    if any(h in k for h in INFO_HINTS):
        return "informational"
    if any(h in f" {k} " for h in COMMERCIAL_HINTS):
        return "commercial"
    return "informational"


def score(intent: str, volume: int | None, difficulty: float | None) -> float:
    w = INTENT_WEIGHT.get(intent, 0.3)
    vol = math.log10(volume + 10) if volume is not None else 1.0
    ease = 1 - (difficulty / 100) * 0.7 if difficulty is not None else 0.65
    return round(w * vol * ease, 3)


def load_csv(path: Path) -> list[Opportunity]:
    out: list[Opportunity] = []
    with path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            kw = (row.get("keyword") or "").strip()
            if not kw:
                continue
            intent = (row.get("intent") or "").strip() or classify_intent(kw)
            vol = int(row["volume"]) if (row.get("volume") or "").strip().isdigit() else None
            diff = float(row["difficulty"]) if (row.get("difficulty") or "").strip() else None
            out.append(Opportunity(kw, intent, vol, row.get("volume_source") or None, diff, row.get("season") or None, score(intent, vol, diff)))
    return sorted(out, key=lambda o: o.score, reverse=True)
