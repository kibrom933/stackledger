import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "..", "content", "guides");

const Source = z.object({ title: z.string(), url: z.string().url() });

export const Frontmatter = z.object({
  title: z.string().min(10),
  description: z.string().min(50).max(170),
  type: z.enum(["guide", "comparison", "review", "article"]),
  category: z.string(),
  status: z.enum(["draft", "review", "published"]),
  updated: z.coerce.date(),
  author: z.string(),
  reviewedBy: z.string().optional(),
  products: z.array(z.string()).default([]),
  sources: z.array(Source).min(1, "Every article must cite at least one source"),
});

export type Guide = z.infer<typeof Frontmatter> & {
  slug: string;
  html: string;
  readingMinutes: number;
  headings: { id: string; text: string }[];
};

/** Drafts are visible in development, or when SHOW_DRAFTS=1 (staging). Never in production by default. */
export const showDrafts = () =>
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function load(file: string): Guide {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = Frontmatter.parse(data);
  const headings: Guide["headings"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const id = slugify(text);
    if (depth === 2) headings.push({ id, text });
    return `<h${depth} id="${id}">${marked.Parser.parseInline(tokens)}</h${depth}>`;
  };
  const html = marked.parse(content, { renderer, async: false }) as string;
  const words = content.split(/\s+/).length;
  return { ...fm, slug: file.replace(/\.md$/, ""), html, headings, readingMinutes: Math.max(1, Math.round(words / 200)) };
}

export function allGuides(): Guide[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .filter((g) => g.status === "published" || showDrafts())
    .sort((a, b) => b.updated.getTime() - a.updated.getTime());
}

export function guideBySlug(slug: string) {
  return allGuides().find((g) => g.slug === slug);
}
