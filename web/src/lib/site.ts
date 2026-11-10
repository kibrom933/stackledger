export const site = {
  name: "Driftig",
  tagline: "Uafhængige guides til software for selvstændige og små virksomheder",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "da_DK",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "kontakt@example.com",
};

export const categories = [
  { slug: "regnskab", name: "Regnskab og bogføring", blurb: "Regnskabsprogrammer, digital bogføring og de nye krav i bogføringsloven." },
  { slug: "fakturering", name: "Fakturering og betaling", blurb: "Send fakturaer, tag imod betalinger og få styr på debitorer." },
  { slug: "salg", name: "Salg og kunder", blurb: "CRM, bookingsystemer og nyhedsbreve til små teams." },
  { slug: "webshop", name: "Webshop og hjemmeside", blurb: "Platforme til webshop og hjemmeside, sammenlignet på pris og funktioner." },
  { slug: "ai", name: "AI og produktivitet", blurb: "AI-værktøjer, der sparer tid i hverdagen, og hvad de koster." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
