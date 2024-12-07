import { dx, DxLifecycle } from "@pkgs/dx";
import { Redis } from "ioredis";
import { AppConfig } from "../config/app.config.ts";
import { ConfigModule } from "../config/module.ts";
import { RedisConfig } from "./config.ts";
import { RedisHealthIndicator } from "./health-indicator.ts";

export const RedisModule = dx.Module(
  "redis",
  ConfigModule,
  dx.Provide(
    RedisConfig,
    [AppConfig],
    (config: AppConfig) => config.redis,
  ),
  dx.Provide(
    Redis,
    [RedisConfig],
    (config: RedisConfig) =>
      new Redis(config.url, {
        lazyConnect: true,
        maxRetriesPerRequest: null,
      }),
  ),
  dx.Provide(
    RedisHealthIndicator,
    [Redis],
    (redis: Redis) => new RedisHealthIndicator(redis),
  ),
  dx.Invoke(
    [DxLifecycle, Redis],
    (lifecycle: DxLifecycle, redis: Redis) =>
      lifecycle.append({
        onStart: async () => await redis.connect(),
        onStop: async () => await redis.quit(),
      }),
  ),
);
