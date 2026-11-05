import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  albionEventBotSitePool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Database configuration is unavailable.");
  }

  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });
}

export const databasePool = globalForDatabase.albionEventBotSitePool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.albionEventBotSitePool = databasePool;
}
