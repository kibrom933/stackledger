"""Turn an APPROVED guide into channel drafts (Pinterest pins, Reels/Shorts scripts, newsletter blurb).

Drafts land in content/social/<slug>.json with status 'draft'. Publishing happens only through
official APIs / approved schedulers once the channel is approved for autopublish.
"""
from __future__ import annotations

import json
from pathlib import Path

import anthropic
import frontmatter
from pydantic import BaseModel, Field

from .config import MODEL, SOCIAL_DIR

SYSTEM = """Du laver opslag til Driftigs kanaler ud fra en godkendt guide. Brug kun indhold fra guiden.
Ingen påståede egne oplevelser ud over guidens testnoter, ingen løfter om besparelser, ingen pres. Opslag med link til produkter skal starte med 'Reklame'.
LinkedIn: et fagligt opslag på 600-1200 tegn med én pointe fra guiden.\nPinterest: nyttig titel (maks 100 tegn) og beskrivelse (maks 450 tegn) med naturlige søgeord.
Reels/Shorts: 20-40 sekunder, hook i første 2 sekunder, 4-6 scener, tekst på skærm og voice-over hver for sig."""


class Pin(BaseModel):
    title: str
    description: str
    image_brief: str = Field(description="Beskrivelse af en grafik vi selv laver (egne skærmbilleder eller grafik, ingen leverandørbilleder uden licens)")
    board: str


class VideoScript(BaseModel):
    hook: str
    scenes: list[str]
    on_screen_text: list[str]
    caption: str
    contains_affiliate_links: bool


class ChannelPack(BaseModel):
    linkedin_post: str
    pins: list[Pin]
    reel: VideoScript
    short: VideoScript
    newsletter_blurb: str


def make_pack(guide_path: Path, client: anthropic.Anthropic | None = None) -> Path:
    post = frontmatter.load(guide_path)
    if post.get("status") != "published":
        raise ValueError("Only published (human-approved) guides can be turned into social posts")
    client = client or anthropic.Anthropic()
    resp = client.messages.parse(
        model=MODEL, max_tokens=16000, output_config={"effort": "medium"},
        system=[{"type": "text", "text": SYSTEM, "cache_control": {"type": "ephemeral"}}],
        messages=[{"role": "user", "content": f"Guide: {post['title']}\nURL-slug: {guide_path.stem}\n\n{post.content}"}],
        output_format=ChannelPack,
    )
    if resp.stop_reason == "refusal":
        raise RuntimeError("Model declined")
    SOCIAL_DIR.mkdir(parents=True, exist_ok=True)
    out = SOCIAL_DIR / f"{guide_path.stem}.json"
    out.write_text(json.dumps({"status": "draft", "guide": guide_path.stem, **resp.parsed_output.model_dump()}, ensure_ascii=False, indent=2))
    return out
