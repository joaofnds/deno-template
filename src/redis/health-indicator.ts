import { Redis } from "ioredis";
import { HealthIndicator } from "../health/health-checker.ts";

export class RedisHealthIndicator implements HealthIndicator {
  constructor(private readonly redis: Redis) {
  }

  async check() {
    try {
      const pong = await this.redis.ping();
      if (pong !== "PONG") {
        throw new Error("Unexpected response");
      }
      return "up";
    } catch {
      return "down";
    }
  }
}
