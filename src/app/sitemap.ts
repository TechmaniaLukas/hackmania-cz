import type { MetadataRoute } from "next";
import { hackathons, events } from "@/lib/mock-data";

const BASE = "https://hackmania.cz";

export default function sitemap(): MetadataRoute.Sitemap {
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
