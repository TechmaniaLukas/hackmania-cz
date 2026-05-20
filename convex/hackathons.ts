import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("upcoming"),
        v.literal("ongoing"),
        v.literal("past")
      )
    ),
    topic: v.optional(v.string()),
    city: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let items;
    if (args.status) {
      items = await ctx.db
        .query("hackathons")
        .withIndex("by_status_date", (q) => q.eq("status", args.status!))
        .order("asc")
        .collect();
    } else {
      items = await ctx.db.query("hackathons").collect();
    }
    return items.filter((h) => {
      if (args.topic && !h.topics.includes(args.topic)) return false;
      if (args.city && h.city !== args.city) return false;
      return true;
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("hackathons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const featured = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("hackathons")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .take(6);
  },
});
