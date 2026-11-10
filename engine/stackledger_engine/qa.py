"""Deterministic quality gate. A draft must pass this before a human is asked to approve it.

It does not replace human fact-checking; it catches the failure modes that get affiliate
sites penalised or break Danish marketing law: invented experience, unsupported health or
superlative claims, missing sources, missing disclosure, stale prices.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from datetime import date, datetime
from pathlib import Path

import frontmatter

from .config import DATA_DIR

# Claims of first-hand experience. Only allowed when frontmatter says hands_on: true (and we have our own photos).
EXPERIENCE = [
    r"\bvi har testet\b", r"\bvi testede\b", r"\bi vores test\b", r"\bjeg har (?:selv )?(?:prøvet|testet|brugt)\b",
    r"\bvores kunder\b", r"\bvi bruger selv\b", r"\bjeg bruger selv\b",
    r"\bwe tested\b", r"\bwe've tested\b", r"\bin our (?:testing|tests)\b", r"\bwe (?:use|used) it (?:daily|every day)\b", r"\bI personally\b", r"\bour clients\b", r"\bour customers\b",
]
# Claims needing very strong evidence, or unresolved gaps the drafter flagged.
RISKY_CLAIMS = [
    r"\bgaranteret\b", r"\b100 ?% (?:sikker|lovlig|gratis)\b", r"\bgodkendt af skat\b", r"\bskat anbefaler\b",
    r"\brevisorer anbefaler\b", r"\bmarkedets bedste\b", r"\bden bedste på markedet\b", r"\bspar \d+ ?% garanteret\b",
    r"\bguaranteed\b", r"\bbest on the market\b", r"\bfully gdpr[- ]compliant\b", r"\b100 ?% (?:accurate|secure|private)\b", r"\bnever hallucinates?\b", r"\bsaves? you \d+ hours\b", r"\bclinically proven\b", r"\[KILDE MANGLER\]", r"\[SOURCE NEEDED\]",
]
# Pressure tactics we do not use.
MANIPULATIVE = [r"\bbuy now before\b", r"\btoday only\b", r"\blast chance\b", r"\bhurry\b", r"\bdon't miss out\b"]

REQUIRED_KEYS = {"title", "description", "type", "category", "status", "updated", "author", "sources"}
PRICE_MAX_AGE_DAYS = 14


@dataclass
class QaResult:
    path: str
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return not self.errors

    def as_dict(self) -> dict:
        return {"path": self.path, "passed": self.passed, "errors": self.errors, "warnings": self.warnings}


def _find(patterns: list[str], text: str) -> list[str]:
    hits = []
    for p in patterns:
        for m in re.finditer(p, text, flags=re.IGNORECASE):
            line = text.count("\n", 0, m.start()) + 1
            hits.append(f"line {line}: '{m.group(0)}'")
    return hits


def _products() -> dict[str, dict]:
    f = DATA_DIR / "products.json"
    return {p["id"]: p for p in json.loads(f.read_text())["products"]} if f.exists() else {}


def check_file(path: Path, today: date | None = None) -> QaResult:
    today = today or date.today()
    post = frontmatter.load(path)
    meta, body = post.metadata, post.content
    res = QaResult(str(path))

    missing = REQUIRED_KEYS - meta.keys()
    if missing:
        res.errors.append(f"missing frontmatter: {sorted(missing)}")
    desc = str(meta.get("description", ""))
    if not 50 <= len(desc) <= 170:
        res.errors.append(f"description must be 50-170 chars (is {len(desc)})")
    sources = meta.get("sources") or []
    if len(sources) < 2:
        res.errors.append("at least 2 sources required")
    for s in sources:
        if not str(s.get("url", "")).startswith("https://"):
            res.errors.append(f"source without https url: {s}")

    words = len(re.findall(r"\w+", body))
    min_words = 300 if meta.get("type") == "article" else 600
    if words < min_words:
        res.errors.append(f"too thin: {words} words (< {min_words})")

    if not meta.get("hands_on"):
        for h in _find(EXPERIENCE, body):
            res.errors.append(f"first-hand experience claim without hands_on evidence: {h}")
    for h in _find(RISKY_CLAIMS, body):
        res.errors.append(f"unsupported/risky claim: {h}")
    for h in _find(MANIPULATIVE, body):
        res.errors.append(f"manipulative CTA: {h}")

    catalog = _products()
    for pid in meta.get("products") or []:
        p = catalog.get(pid)
        if not p:
            res.errors.append(f"unknown product id: {pid}")
            continue
        if not p.get("facts"):
            res.errors.append(f"product {pid} has no sourced facts")
        checked = p.get("priceCheckedAt")
        if checked and (today - datetime.fromisoformat(checked).date()).days > PRICE_MAX_AGE_DAYS:
            res.warnings.append(f"product {pid} price is stale (checked {checked}); site will hide it")
        if p.get("imageUrl") and not p.get("imageLicense"):
            res.errors.append(f"product {pid} has an image without a licence")

    if meta.get("category") == "rules" and "legal advice" not in body.lower() and "lawyer" not in body.lower():
        res.warnings.append("rules article never suggests legal advice")
    if re.search(r"[$€£]\s?\d", body) and not re.search(r"(per|/)\s?(month|mo|user|seat|year)", body, re.I):
        res.warnings.append("prices mentioned without a billing unit (per month/user/year)")
    if re.search(r"https?://(?!www\.stackledger\.dk)[^\s)]*(?:awin1|adtraction|partner-ads|partnerstack|impact\.com|amzn\.to|tag=|ref=|via=)", body):
        res.errors.append("raw affiliate link in body; use product cards (/go/...) so links are labelled and logged")
    return res


def check_all(directory: Path) -> list[QaResult]:
    return [check_file(p) for p in sorted(directory.glob("*.md"))]
