import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { DatabaseModule } from "../database/module.ts";
import { PostgresHealthIndicator } from "../database/postgres-indicator.ts";
import { HTTPServerModule } from "../http-server/module.ts";
import { RedisHealthIndicator } from "../redis/health-indicator.ts";
import { RedisModule } from "../redis/module.ts";
import { HealthController } from "./health.controller.ts";

export const HealthModule = dx.Module(
  "health",
  RedisModule,
  DatabaseModule,
  HTTPServerModule,
  dx.Provide(
    HealthController,
    [RedisHealthIndicator, PostgresHealthIndicator],
    (redis: RedisHealthIndicator, postgres: PostgresHealthIndicator) =>
      new HealthController(redis, postgres),
  ),
  dx.Invoke(
    [Hono, HealthController],
    (app: Hono, healthController: HealthController) =>
      healthController.register(app),
  ),
);
