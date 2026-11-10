"""Command line entry point. Every command records a job_runs row when Supabase is configured."""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from . import db, finance, qa, reports
from .config import CONTENT_DIR, DATA_DIR


def _log(job: str, ok: bool, summary: dict) -> None:
    try:
        db.insert("job_runs", {"job": job, "ok": ok, "finished_at": datetime.now(timezone.utc).isoformat(), "summary": summary})
    except Exception as e:  # logging must never mask the real result
        print(f"(job log failed: {e})", file=sys.stderr)


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(prog="driftig")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("qa", help="Run the quality gate on all guides")
    o = sub.add_parser("opportunities", help="Score a keyword CSV")
    o.add_argument("csv", type=Path)
    o.add_argument("--save", action="store_true", help="Upsert into Supabase")
    d = sub.add_parser("draft", help="Draft a guide with Claude (writes a draft file)")
    d.add_argument("keyword"); d.add_argument("--category", required=True)
    d.add_argument("--kind", default="guide", choices=["guide", "comparison", "review", "article"])
    d.add_argument("--notes", type=Path, required=True, help="File with sources and hands-on test notes")
    d.add_argument("--products", nargs="*", default=[])
    s = sub.add_parser("social", help="Make channel drafts from a published guide")
    s.add_argument("slug")
    c = sub.add_parser("import-commissions", help="Import a network CSV export")
    c.add_argument("network", choices=["partner-ads", "partnerstack"]); c.add_argument("csv", type=Path)
    sub.add_parser("weekly-report")
    sub.add_parser("finance")
    sub.add_parser("partners", help="Show partner status and what is unverified")
    a = p.parse_args(argv)

    if a.cmd == "qa":
        results = qa.check_all(CONTENT_DIR)
        for r in results:
            print(("PASS " if r.passed else "FAIL ") + r.path)
            for e in r.errors: print("   error:", e)
            for w in r.warnings: print("   warn: ", w)
        ok = all(r.passed for r in results)
        _log("qa", ok, {"files": len(results), "failed": sum(not r.passed for r in results)})
        return 0 if ok else 1
    if a.cmd == "opportunities":
        from .opportunities import load_csv
        opps = load_csv(a.csv)
        for o_ in opps[:30]:
            print(f"{o_.score:6.3f}  {o_.intent:13} {o_.monthly_volume or '?':>6}  {o_.keyword}")
        if a.save:
            db.upsert("opportunities", [{"keyword": x.keyword, "intent": x.intent, "monthly_volume": x.monthly_volume, "volume_source": x.volume_source,
                                         "season": x.season, "score": x.score} for x in opps], on_conflict="keyword")
        return 0
    if a.cmd == "draft":
        from .drafting import draft_article
        path = draft_article(a.keyword, a.category, a.kind, a.notes.read_text(encoding="utf-8"), a.products)
        r = qa.check_file(path)
        print(f"Draft written: {path}\nQA: {'PASS' if r.passed else 'FAIL'}")
        for e in r.errors: print("   error:", e)
        _log("draft", True, {"path": str(path), "qa": r.as_dict()})
        return 0
    if a.cmd == "social":
        from .social import make_pack
        print(make_pack(CONTENT_DIR / f"{a.slug}.md"))
        return 0
    if a.cmd == "import-commissions":
        from .commissions import import_csv
        lookup = {pp["name"].lower(): pp["id"] for pp in json.loads((DATA_DIR / "partners.json").read_text())["partners"]}
        n = import_csv(a.network, a.csv, lookup)
        print(f"Imported {n} rows"); _log("import-commissions", True, {"network": a.network, "rows": n})
        return 0
    if a.cmd == "weekly-report":
        out = reports.weekly(); print(out); _log("weekly-report", True, {"path": str(out)})
        return 0
    if a.cmd == "finance":
        print(finance.markdown()); return 0
    if a.cmd == "partners":
        for pp in json.loads((DATA_DIR / "partners.json").read_text())["partners"]:
            flag = "verified" if pp["commission"]["verified"] else "UNVERIFIED"
            print(f"{pp['name']:14} {pp['network']:28} {pp['applicationStatus']:12} [{flag}] {pp['commission']['text']}")
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
