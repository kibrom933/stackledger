import type { MetadataRoute } from "next";
import { allGuides } from "@/lib/content";
import { categories, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = allGuides().filter((g) => g.status === "published");
  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/guides` },
    ...categories.map((c) => ({ url: `${site.url}/category/${c.slug}` })),
    ...guides.map((g) => ({ url: `${site.url}/guides/${g.slug}`, lastModified: g.updated })),
    ...["about", "affiliate-disclosure", "privacy", "cookies", "terms", "newsletter"].map((p) => ({ url: `${site.url}/${p}` })),
  ];
}
