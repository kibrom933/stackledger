from pathlib import Path

from driftig_engine import qa
from driftig_engine.config import CONTENT_DIR

BASE = """---
title: "How to choose an AI meeting notetaker"
description: "A calm walkthrough of what to check before you let an AI notetaker join your calls: price, accuracy, consent and data retention."
type: guide
category: meetings
status: draft
updated: 2026-11-10
author: Test
sources:
  - {title: A, url: "https://a.example"}
  - {title: B, url: "https://b.example"}
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
    assert any("too thin" in e for e in qa.check_file(write(tmp_path, "Short text.")).errors)


def test_fake_experience_fails(tmp_path):
    assert any("experience" in e for e in qa.check_file(write(tmp_path, ("word " * 700) + "\nWe tested every tool for a month.")).errors)


def test_hands_on_allows_experience(tmp_path):
    p = write(tmp_path, ("word " * 700) + "\nWe tested the transcription on three calls.")
    p.write_text(p.read_text().replace("author: Test", "author: Test\nhands_on: true"), encoding="utf-8")
    assert qa.check_file(p).passed


def test_risky_claim_and_raw_affiliate_link_fail(tmp_path):
    body = ("word " * 700) + "\nIt is fully GDPR-compliant and never hallucinates. https://elevenlabs.io/?via=abc"
    errs = qa.check_file(write(tmp_path, body)).errors
    assert any("risky" in e for e in errs) and any("raw affiliate link" in e for e in errs)


def test_missing_source_marker_fails(tmp_path):
    assert any("SOURCE NEEDED" in e for e in qa.check_file(write(tmp_path, ("word " * 700) + " [SOURCE NEEDED]")).errors)


def test_price_without_unit_warns(tmp_path):
    r = qa.check_file(write(tmp_path, ("word " * 700) + " It costs $20."))
    assert any("billing unit" in w for w in r.warnings)
