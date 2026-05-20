import { query } from "./_generated/server";
import { v } from "convex/values";

const categories = v.union(
  v.literal("ai"),
  v.literal("vibecoding"),
  v.literal("ai-kamery"),
  v.literal("ai-nastroje"),
  v.literal("matematika"),
  v.literal("technika"),
  v.literal("robotika"),
  v.literal("ostatni")
);

export const list = query({
  args: {
    category: v.optional(categories),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 30;
    if (args.category) {
      return ctx.db
        .query("news")
        .withIndex("by_category_date", (q) => q.eq("category", args.category!))
        .order("desc")
        .take(limit);
    }
    return ctx.db
      .query("news")
      .withIndex("by_published")
      .order("desc")
      .take(limit);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
