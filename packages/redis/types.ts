export interface RedisConfig {
  url: string;
  keyPrefix?: string;
  maxRetriesPerRequest?: number | null;
  enableReadyCheck: boolean;
}
