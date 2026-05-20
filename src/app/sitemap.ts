import type { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

const BASE = "https://hackmania.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = [
    "",
    "/hackathony",
    "/akce",
    "/novinky",
    "/komunita",
    "/partneri",
    "/skoly",
    "/o-nas",
    "/kontakt",
    "/pro-firmy",
    "/pro-skoly",
    "/faq",
    "/kodex",
    "/ochrana-osobnich-udaju",
    "/cookies",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  // Build je tolerantní — při chybějícím Convex URL vrátíme prázdné pole.
  const [hackathons, events] = await Promise.all([
    fetchQuery(api.hackathons.list, {}).catch(() => []),
    fetchQuery(api.events.list, { limit: 200 }).catch(() => []),
  ]);

  const hackathonPages = hackathons.map((h) => ({
    url: `${BASE}/hackathony/${h.slug}`,
    lastModified: new Date(h.startDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const eventPages = events.map((e) => ({
    url: `${BASE}/akce/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...hackathonPages, ...eventPages];
}
