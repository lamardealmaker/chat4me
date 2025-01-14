import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Process AI tasks every minute
crons.interval(
  "process-ai-tasks",
  { minutes: 1 },
  api.ai.processPendingTasks,
  {}
);

// Make sure to export the crons object as the default export
export default crons; 