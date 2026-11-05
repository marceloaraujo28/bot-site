import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  albionEventBotSitePool?: Pool;
};

function getPool() {
  if (globalForDatabase.albionEventBotSitePool) {
    return globalForDatabase.albionEventBotSitePool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Database configuration is unavailable.");
  }

  const pool = new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });

  globalForDatabase.albionEventBotSitePool = pool;
  return pool;
}

/**
 * A lazy Pool facade. Route modules can safely be imported while Next builds a
 * Preview without a runtime DATABASE_URL; the configuration is required only
 * when a query/connection is actually requested at runtime.
 */
export const databasePool = new Proxy({} as Pool, {
  get(_target, property) {
    const pool = getPool();
    const value = Reflect.get(pool, property, pool);
    return typeof value === "function" ? value.bind(pool) : value;
  },
});
