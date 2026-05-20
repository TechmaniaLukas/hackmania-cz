import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  hackathons: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    city: v.string(),
    venue: v.optional(v.string()),
    startDate: v.number(),
    endDate: v.number(),
    registrationUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    topics: v.array(v.string()),
    organizer: v.string(),
    prizePool: v.optional(v.string()),
    capacity: v.optional(v.number()),
    isOnline: v.boolean(),
    featured: v.boolean(),
    status: v.union(
      v.literal("upcoming"),
      v.literal("ongoing"),
      v.literal("past")
    ),
  })
    .index("by_slug", ["slug"])
    .index("by_status_date", ["status", "startDate"])
    .index("by_featured", ["featured"]),

  partners: defineTable({
    name: v.string(),
    logoUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    tier: v.union(
      v.literal("platinum"),
      v.literal("gold"),
      v.literal("silver"),
      v.literal("bronze")
    ),
    description: v.optional(v.string()),
  }).index("by_tier", ["tier"]),

  schools: defineTable({
    name: v.string(),
    city: v.string(),
    region: v.string(),
    type: v.union(
      v.literal("university"),
      v.literal("highschool"),
      v.literal("primary"),
      v.literal("other")
    ),
    websiteUrl: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  }).index("by_region", ["region"]),

  events: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    type: v.union(
      v.literal("workshop"),
      v.literal("meetup"),
      v.literal("conference"),
      v.literal("other")
    ),
    city: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    registrationUrl: v.optional(v.string()),
    topics: v.array(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_date", ["startDate"]),

  news: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    content: v.optional(v.string()),
    sourceUrl: v.string(),
    sourceName: v.string(),
    imageUrl: v.optional(v.string()),
    category: v.union(
      v.literal("ai"),
      v.literal("vibecoding"),
      v.literal("ai-kamery"),
      v.literal("ai-nastroje"),
      v.literal("matematika"),
      v.literal("technika"),
      v.literal("robotika"),
      v.literal("ostatni")
    ),
    publishedAt: v.number(),
    featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category_date", ["category", "publishedAt"])
    .index("by_published", ["publishedAt"]),
});
