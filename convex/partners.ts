import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("partners").collect();
    const order = { platinum: 0, gold: 1, silver: 2, bronze: 3 } as const;
    return all.sort((a, b) => order[a.tier] - order[b.tier]);
  },
});
