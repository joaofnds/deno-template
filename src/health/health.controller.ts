import { Context, Hono } from "hono";
import { PostgresHealthIndicator } from "../database/postgres-indicator.ts";
import { RedisHealthIndicator } from "../redis/health-indicator.ts";

export class HealthController {
  constructor(
    private readonly redis: RedisHealthIndicator,
    private readonly postgres: PostgresHealthIndicator,
  ) {}

  register(hono: Hono) {
    hono.get("/health", this.check.bind(this));
  }

  async check(context: Context) {
    const [redis, postgres] = await Promise.all([
      this.redis.check(),
      this.postgres.check(),
    ]);

    return context.json({ redis, postgres });
  }
}
