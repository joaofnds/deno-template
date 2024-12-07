import { dx, DxLifecycle } from "@pkgs/dx";
import { Redis } from "ioredis";
import { Logger } from "pino";
import { LoggerModule } from "../../logger/module.ts";
import { RedisModule } from "../../redis/module.ts";
import { UserCreatedWorker } from "./user-created.worker.ts";

export const UserWorkerModule = dx.Module(
  "user-worker",
  LoggerModule,
  RedisModule,
  dx.Provide(
    UserCreatedWorker,
    [Redis, "logger"],
    (redis: Redis, logger: Logger) =>
      new UserCreatedWorker(
        redis,
        logger.child({ context: "UserCreatedWorker" }),
      ),
  ),
  dx.Invoke(
    [DxLifecycle, UserCreatedWorker],
    (lifecycle: DxLifecycle, worker: UserCreatedWorker) =>
      lifecycle.append({
        onStart: () => worker.start(),
        onStop: async () => await worker.stop(),
      }),
  ),
);
