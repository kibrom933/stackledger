from pathlib import Path

from driftig_engine import qa
from driftig_engine.config import CONTENT_DIR

BASE = """---
title: "Sådan vælger du et regnskabsprogram"
description: "En rolig gennemgang af, hvad du skal kigge efter, når du vælger regnskabsprogram til din lille virksomhed i Danmark."
type: guide
category: regnskab
status: draft
updated: 2026-11-10
author: Test
sources:
  - {title: A, url: "https://a.dk"}
  - {title: B, url: "https://b.dk"}
---
"""


def write(tmp_path: Path, body: str) -> Path:
    p = tmp_path / "t.md"
    p.write_text(BASE + body, encoding="utf-8")
    return p


def test_seed_guides_pass():
    for r in qa.check_all(CONTENT_DIR):
        assert r.passed, r.errors


def test_thin_content_fails(tmp_path):
    assert any("too thin" in e for e in qa.check_file(write(tmp_path, "Kort tekst. Spørg din revisor.")).errors)


def test_fake_experience_fails(tmp_path):
    body = ("Ord " * 700) + "\nVi har testet alle programmer. Spørg din revisor."
    assert any("experience" in e for e in qa.check_file(write(tmp_path, body)).errors)


def test_hands_on_allows_experience(tmp_path):
    p = write(tmp_path, ("Ord " * 700) + "\nVi har testet programmet. Spørg din revisor.")
    p.write_text(p.read_text().replace("author: Test", "author: Test\nhands_on: true"), encoding="utf-8")
    assert qa.check_file(p).passed


def test_risky_claim_and_raw_affiliate_link_fail(tmp_path):
    body = ("Ord " * 700) + "\nDet er garanteret godkendt af SKAT. https://www.partner-ads.com/dk/klikbanner.php?x=1 revisor"
    errs = qa.check_file(write(tmp_path, body)).errors
    assert any("risky" in e for e in errs) and any("raw affiliate link" in e for e in errs)


def test_missing_source_marker_fails(tmp_path):
    assert any("KILDE" in e for e in qa.check_file(write(tmp_path, ("Ord " * 700) + " [KILDE MANGLER] revisor")).errors)
