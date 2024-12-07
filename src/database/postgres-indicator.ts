import { EntityManager } from "@mikro-orm/core";
import { HealthIndicator } from "../health/health-checker.ts";

export class PostgresHealthIndicator implements HealthIndicator {
  constructor(private readonly entityManager: EntityManager) {}

  async check() {
    try {
      await this.entityManager.getConnection().execute("SELECT NOW()");
      return "up";
    } catch {
      return "down";
    }
  }
}
