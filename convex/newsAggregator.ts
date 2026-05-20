"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

type Category =
  | "ai"
  | "vibecoding"
  | "ai-kamery"
  | "ai-nastroje"
  | "matematika"
  | "technika"
  | "robotika"
  | "ostatni";

type FeedSource = {
  name: string;
  url: string;
  category: Category;
};

const FEEDS: FeedSource[] = [
  { name: "Anthropic", url: "https://www.anthropic.com/rss.xml", category: "ai" },
  { name: "HuggingFace", url: "https://huggingface.co/blog/feed.xml", category: "ai-nastroje" },
  { name: "DeepMind", url: "https://deepmind.google/blog/rss.xml", category: "ai" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", category: "ai" },
  { name: "Lupa.cz", url: "https://www.lupa.cz/rss/clanky/", category: "ostatni" },
  { name: "Zdroják", url: "https://zdrojak.cz/feed/", category: "ai-nastroje" },
];

export const run = internalAction({
  args: {},
  handler: async (ctx) => {
    const collected: Array<{
      title: string;
      summary: string;
      sourceUrl: string;
      sourceName: string;
      category: Category;
      publishedAt: number;
    }> = [];

    for (const feed of FEEDS) {
      try {
        const res = await fetch(feed.url, {
          headers: { "User-Agent": "Hackmania Bot (+https://hackmania.cz)" },
        });
        if (!res.ok) continue;
        const xml = await res.text();
        const items = parseRss(xml).slice(0, 10);
        for (const item of items) {
          collected.push({
            title: item.title,
            summary: stripHtml(item.description).slice(0, 400),
            sourceUrl: item.link,
            sourceName: feed.name,
            category: feed.category,
            publishedAt: item.pubDate,
          });
        }
      } catch (err) {
        console.error(`Feed ${feed.name} failed`, err);
      }
    }

    await ctx.runMutation(internal.newsMutations.upsertMany, { items: collected });
    return { collected: collected.length };
  },
});

// Exported so tests / manual invocation can parse feeds directly.
export const _internal = { parseRss, stripHtml };

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function parseRss(xml: string): Array<{ title: string; link: string; description: string; pubDate: number }> {
  const items: Array<{ title: string; link: string; description: string; pubDate: number }> = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/g) ?? xml.match(/<entry[\s\S]*?<\/entry>/g) ?? [];
  for (const block of blocks) {
    const title = extract(block, "title");
    const link = extract(block, "link") || (block.match(/<link[^>]*href="([^"]+)"/)?.[1] ?? "");
    const description = extract(block, "description") || extract(block, "summary") || extract(block, "content");
    const pub = extract(block, "pubDate") || extract(block, "published") || extract(block, "updated");
    const pubDate = pub ? new Date(pub).getTime() : Date.now();
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function extract(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return "";
  return m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

// unused var guard (keeps _internal reachable so linter doesn't complain)
void v;
