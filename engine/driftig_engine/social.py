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

SYSTEM = """You turn an approved Driftig guide into channel posts. Use only what the guide says.
No claimed experience beyond the guide's test notes, no promised savings, no pressure. Posts with affiliate links start with "Ad:" and say the link earns a commission.
LinkedIn: one practical post of 600-1200 characters with one takeaway from the guide.
Pinterest: a useful title (max 100 characters) and description (max 450 characters) with natural keywords.
Reels/Shorts: 20-40 seconds, a hook in the first 2 seconds, 4-6 scenes, on-screen text and voice-over kept separate."""


class Pin(BaseModel):
    title: str
    description: str
    image_brief: str = Field(description="Beskrivelse af en grafik vi selv laver (our own screenshots or graphics; no vendor images without a licence)")
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
        messages=[{"role": "user", "content": f"Guide: {post['title']}\nURL slug: {guide_path.stem}\n\n{post.content}"}],
        output_format=ChannelPack,
    )
    if resp.stop_reason == "refusal":
        raise RuntimeError("Model declined")
    SOCIAL_DIR.mkdir(parents=True, exist_ok=True)
    out = SOCIAL_DIR / f"{guide_path.stem}.json"
    out.write_text(json.dumps({"status": "draft", "guide": guide_path.stem, **resp.parsed_output.model_dump()}, ensure_ascii=False, indent=2))
    return out
