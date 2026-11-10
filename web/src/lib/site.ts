export const site = {
  name: "Driftig",
  tagline: "AI tools, tested from Europe: what they cost, what they do with your data, and whether they're worth it",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
};

export const categories = [
  { slug: "writing", name: "Writing and research", blurb: "AI assistants and writing tools, compared on output, price and data use." },
  { slug: "meetings", name: "Meetings and notes", blurb: "AI notetakers and transcription, with a hard look at consent and storage." },
  { slug: "voice-video", name: "Voice and video", blurb: "AI voice, dubbing, avatars and video editing for small teams." },
  { slug: "automation", name: "Automation and agents", blurb: "Connect your apps and let workflows do the repetitive work." },
  { slug: "sales", name: "Sales and CRM", blurb: "CRMs and sales tools with AI features that actually save time." },
  { slug: "rules", name: "Rules and privacy", blurb: "The EU AI Act, GDPR and what they mean when you use AI tools at work." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
