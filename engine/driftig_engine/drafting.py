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

SYSTEM = """Du er redaktør på Driftig, et dansk site med uafhængige guides til software for selvstændige og små virksomheder.

Regler (brud på dem gør artiklen ubrugelig):
- Skriv på klart, venligt dansk til travle selvstændige. Ingen fyldtekst, ingen overdrivelser, ingen buzzwords.
- Brug KUN fakta fra de kilder, testnoter og produktdata, du får. Kan du ikke underbygge et udsagn, skriv [KILDE MANGLER] i stedet for at gætte.
- Skriv kun "vi har testet" om ting, der står i testnoterne fra vores egne prøvekonti. Opfind aldrig erfaringer, kunder eller citater.
- Regler fra SKAT, Erhvervsstyrelsen og love: gengiv præcist, angiv kilden, og henvis til revisor ved tvivl. Ingen juridisk rådgivning.
- Priser: kun med dato og "ekskl. moms"/"inkl. moms" som i kilden.
- Ingen pres-taktikker. En opfordring til handling skal være rolig og saglig. Nævn også gode alternativer, vi ikke tjener på.
- Ingen links til leverandører i brødteksten. Produkter vises af sitet selv via produkt-id'er.
- Struktur: kort svar først, H2-afsnit der svarer på det, læseren faktisk spørger om, en tjekliste til sidst.
"""


class Source(BaseModel):
    title: str
    url: str


class Draft(BaseModel):
    title: str = Field(description="Dansk titel, 40-70 tegn")
    description: str = Field(description="Meta-beskrivelse, 120-160 tegn")
    slug: str = Field(description="URL-slug med a-z, 0-9 og bindestreger")
    body_markdown: str = Field(description="Artiklen i Markdown, uden H1")
    sources: list[Source]
    open_questions: list[str] = Field(description="Fakta en redaktør skal tjekke før udgivelse")


def _slug(s: str) -> str:
    s = s.lower().replace("æ", "ae").replace("ø", "oe").replace("å", "aa")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:80]


def draft_article(keyword: str, category: str, kind: str, source_notes: str, product_ids: list[str] | None = None,
                  client: anthropic.Anthropic | None = None) -> Path:
    client = client or anthropic.Anthropic()
    catalog = json.loads((DATA_DIR / "products.json").read_text())["products"]
    products = [p for p in catalog if p["id"] in (product_ids or [])]
    user = (
        f"Søgeord/emne: {keyword}\nArtikeltype: {kind}\nKategori: {category}\n\n"
        f"Kilder, testnoter fra egne prøvekonti og noter (eneste tilladte faktagrundlag):\n{source_notes}\n\n"
        f"Produktdata (kun disse fakta må nævnes):\n{json.dumps(products, ensure_ascii=False, indent=1)}"
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
        updated=date.today().isoformat(), author="Driftig-redaktionen", products=product_ids or [],
        sources=[s.model_dump() for s in d.sources], open_questions=d.open_questions, ai_assisted=True,
    )
    path = CONTENT_DIR / f"{_slug(d.slug or d.title)}.md"
    if path.exists():
        raise FileExistsError(f"{path} exists; refresh it instead of overwriting")
    path.write_text(frontmatter.dumps(post), encoding="utf-8")
    return path
