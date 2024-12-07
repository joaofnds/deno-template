import { dx, DxLifecycle } from "@pkgs/dx";
import { Redis } from "ioredis";
import { DelayedQueue } from "./deleayed-queue.ts";

export const ProvideDelayedQueue = (queueName: string) =>
  dx.Options(
    dx.Provide(
      queueName,
      [Redis],
      (redis: Redis) => new DelayedQueue(queueName, redis),
    ),
    dx.Invoke(
      [DxLifecycle, queueName],
      (lifecycle: DxLifecycle, queue: DelayedQueue) =>
        lifecycle.append({
          onStart: () => queue.start(),
          onStop: () => queue.stop(),
        }),
    ),
  );
