import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const winnerPlace = v.union(
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal("special")
);

const updateType = v.union(
  v.literal("live"),
  v.literal("winners"),
  v.literal("recap"),
  v.literal("press")
);

const hackathonRecap = v.object({
  summary: v.string(),
  stats: v.object({
    attendees: v.number(),
    teams: v.number(),
    submissions: v.number(),
    prizePool: v.optional(v.string()),
  }),
  winners: v.array(
    v.object({
      place: winnerPlace,
      teamName: v.string(),
      projectName: v.string(),
      projectUrl: v.optional(v.string()),
      repoUrl: v.optional(v.string()),
      members: v.optional(v.array(v.string())),
      category: v.optional(v.string()),
      oneLiner: v.optional(v.string()),
    })
  ),
  gallery: v.array(
    v.object({
      src: v.string(),
      caption: v.optional(v.string()),
      credit: v.optional(v.string()),
    })
  ),
  updates: v.array(
    v.object({
      date: v.number(),
      title: v.string(),
      body: v.string(),
      type: updateType,
    })
  ),
  recapUrl: v.optional(v.string()),
  videoUrl: v.optional(v.string()),
});

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
    recap: v.optional(hackathonRecap),
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
    slug: v.string(),
    name: v.string(),
    short: v.string(),
    city: v.string(),
    region: v.string(),
    type: v.union(
      v.literal("university"),
      v.literal("highschool"),
      v.literal("other")
    ),
    websiteUrl: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    lat: v.number(),
    lng: v.number(),
    hackathonsHosted: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_region", ["region"]),

  events: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    type: v.union(
      v.literal("workshop"),
      v.literal("meetup"),
      v.literal("conference"),
      v.literal("prednaska")
    ),
    city: v.string(),
    venue: v.optional(v.string()),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    registrationUrl: v.optional(v.string()),
    topics: v.array(v.string()),
    organizer: v.string(),
    lecturer: v.optional(v.string()),
    price: v.optional(v.string()),
    capacity: v.optional(v.number()),
    isOnline: v.boolean(),
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
