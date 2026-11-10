from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content" / "guides"
SOCIAL_DIR = ROOT / "content" / "social"
REPORTS_DIR = ROOT / "reports"
DATA_DIR = ROOT / "data"

MODEL = os.environ.get("STACKLEDGER_MODEL", "claude-opus-5-5")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
