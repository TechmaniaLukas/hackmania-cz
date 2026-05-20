import { query } from "./_generated/server";
import { v } from "convex/values";

// Status v DB je hardcoded — po překlopení termínu zastará. Tady ho
// přepočítáváme runtime z dat, aby UI nikdy nelhalo.
function derive(now: number, startDate: number, endDate: number) {
  if (now < startDate) return "upcoming" as const;
  if (now > endDate) return "past" as const;
  return "ongoing" as const;
}

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
    // Index podle DB `status` by lhal — bereme všechno a třídíme my.
    const items = await ctx.db.query("hackathons").collect();
    const now = Date.now();
    const enriched = items.map((h) => ({
      ...h,
      status: derive(now, h.startDate, h.endDate),
    }));
    const filtered = enriched.filter((h) => {
      if (args.status && h.status !== args.status) return false;
      if (args.topic && !h.topics.includes(args.topic)) return false;
      if (args.city && h.city !== args.city) return false;
      return true;
    });
    // Nadcházející/ongoing asc (nejbližší navrch), uplynulé desc
    // (nejnovější proběhlé navrch). Když se filtruje na jeden stav,
    // řazení je konzistentní.
    filtered.sort((a, b) => {
      const aPast = a.status === "past";
      const bPast = b.status === "past";
      if (aPast !== bPast) return aPast ? 1 : -1;
      if (aPast) return b.startDate - a.startDate;
      return a.startDate - b.startDate;
    });
    return filtered;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const h = await ctx.db
      .query("hackathons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!h) return null;
    return { ...h, status: derive(Date.now(), h.startDate, h.endDate) };
  },
});

export const featured = query({
  args: {},
  handler: async (ctx) => {
    // "Doporučené" má smysl jen pro nadcházející akce — proběhlé filtrujeme
    // ven, i kdyby měly featured=true v DB.
    const items = await ctx.db
      .query("hackathons")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
    const now = Date.now();
    return items
      .map((h) => ({ ...h, status: derive(now, h.startDate, h.endDate) }))
      .filter((h) => h.status !== "past")
      .sort((a, b) => a.startDate - b.startDate)
      .slice(0, 6);
  },
});
