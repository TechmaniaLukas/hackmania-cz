import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "aggregate news",
  { hours: 2 },
  internal.newsAggregator.run,
);

export default crons;
