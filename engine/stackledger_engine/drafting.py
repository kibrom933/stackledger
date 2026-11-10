"""Brief -> draft with Claude. Output is always a DRAFT file; nothing is published from here.

The model is told to work only from the facts and sources we hand it, never to invent
experience, and to mark anything it cannot support with [KILDE MANGLER] so QA fails loudly.
"""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

import anthropic
import frontmatter
from pydantic import BaseModel, Field

from .config import CONTENT_DIR, DATA_DIR, MODEL

SYSTEM = """You are an editor at Stackledger, an independent site that reviews AI tools for freelancers and small teams, written from Europe for a global English-speaking audience.

Rules (breaking any of them makes the article unusable):
- Write clear, friendly, plain English for busy people. No filler, no hype, no buzzwords.
- Use ONLY facts from the sources, our own hands-on test notes and the product data you are given. If you cannot support a statement, write [SOURCE NEEDED] instead of guessing.
- Only write "we tested" about things in the hands-on test notes from our own accounts. Never invent experiences, customers, quotes or benchmark numbers.
- Prices: always with the date checked, the currency, and per month/per user/billed annually exactly as in the source.
- Privacy: say what the sources say about data retention, model training on customer data and data location. If a source does not say, write that it is not stated.
- Laws (GDPR, EU AI Act): quote dates and duties exactly with the source; suggest legal advice where it matters. No legal advice.
- No pressure tactics or fake urgency. Calm, specific calls to action. Mention good alternatives that pay us nothing.
- No vendor links in the body. The site renders tools from product ids.
- Structure: the short answer first, H2 sections answering what readers actually ask, a checklist at the end.
"""


class Source(BaseModel):
    title: str
    url: str


class Draft(BaseModel):
    title: str = Field(description="Title, 40-70 characters")
    description: str = Field(description="Meta description, 120-160 characters")
    slug: str = Field(description="URL slug: a-z, 0-9 and hyphens")
    body_markdown: str = Field(description="The article in Markdown, without H1")
    sources: list[Source]
    open_questions: list[str] = Field(description="Facts an editor must check before publishing")


def _slug(s: str) -> str:
    s = s.lower().replace("æ", "ae").replace("ø", "oe").replace("å", "aa")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:80]


def draft_article(keyword: str, category: str, kind: str, source_notes: str, product_ids: list[str] | None = None,
                  client: anthropic.Anthropic | None = None) -> Path:
    client = client or anthropic.Anthropic()
    catalog = json.loads((DATA_DIR / "products.json").read_text())["products"]
    products = [p for p in catalog if p["id"] in (product_ids or [])]
    user = (
        f"Keyword/topic: {keyword}\nArticle type: {kind}\nCategory: {category}\n\n"
        f"Sources, hands-on test notes from our own accounts, and notes (the only allowed factual basis):\n{source_notes}\n\n"
        f"Product data (only these facts may be used):\n{json.dumps(products, ensure_ascii=False, indent=1)}"
    )
    response = client.messages.parse(
        model=MODEL,
        max_tokens=16000,
        system=[{"type": "text", "text": SYSTEM, "cache_control": {"type": "ephemeral"}}],
        output_config={"effort": "high"},
        messages=[{"role": "user", "content": user}],
        output_format=Draft,
    )
    if response.stop_reason == "refusal":
        raise RuntimeError(f"Model declined the brief for '{keyword}'")
    d: Draft = response.parsed_output
    post = frontmatter.Post(
        d.body_markdown,
        title=d.title, description=d.description, type=kind, category=category, status="draft",
        updated=date.today().isoformat(), author="Stackledger editors", products=product_ids or [],
        sources=[s.model_dump() for s in d.sources], open_questions=d.open_questions, ai_assisted=True,
    )
    path = CONTENT_DIR / f"{_slug(d.slug or d.title)}.md"
    if path.exists():
        raise FileExistsError(f"{path} exists; refresh it instead of overwriting")
    path.write_text(frontmatter.dumps(post), encoding="utf-8")
    return path
