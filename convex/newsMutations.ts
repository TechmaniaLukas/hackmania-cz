import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

const category = v.union(
  v.literal("ai"),
  v.literal("vibecoding"),
  v.literal("ai-kamery"),
  v.literal("ai-nastroje"),
  v.literal("matematika"),
  v.literal("technika"),
  v.literal("robotika"),
  v.literal("ostatni"),
);

export const upsertMany = internalMutation({
  args: {
    items: v.array(
      v.object({
        title: v.string(),
        summary: v.string(),
        sourceUrl: v.string(),
        sourceName: v.string(),
        category,
        publishedAt: v.number(),
      }),
    ),
  },
  handler: async (ctx, { items }) => {
    for (const item of items) {
      const slug = slugify(item.title);
      const existing = await ctx.db
        .query("news")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (existing) continue;
      await ctx.db.insert("news", {
        ...item,
        slug,
        featured: false,
      });
    }
    return { inserted: items.length };
  },
});

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
