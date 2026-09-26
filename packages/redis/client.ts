import Redis from "ioredis";

import type { RedisConfig } from "./types";

export function createRedisClient(config: RedisConfig): Redis {
  return new Redis(config.url, {
    keyPrefix: config.keyPrefix,
    maxRetriesPerRequest: config.maxRetriesPerRequest ?? null,
    enableReadyCheck: config.enableReadyCheck ?? true,
  });
}
