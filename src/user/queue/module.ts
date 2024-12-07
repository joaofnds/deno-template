import { dx, DxLifecycle } from "@pkgs/dx";
import { EventModule } from "../../event-emitter/module.ts";
import { EventService } from "../../event-emitter/service.ts";
import { DelayedQueue } from "../../queue/deleayed-queue.ts";
import { ProvideDelayedQueue } from "../../queue/provide-delayed-queue.ts";
import { RedisModule } from "../../redis/module.ts";
import { UserCreatedEvent } from "../events/user-created.event.ts";
import { UserQueueListener } from "./listener.ts";
import { UserCreatedQueue } from "./user-created.queue.ts";

export const UserQueueModule = dx.Module(
  "user-queue",
  EventModule,
  RedisModule,
  ProvideDelayedQueue(UserCreatedQueue.QueueName),
  dx.Provide(
    UserCreatedQueue,
    [UserCreatedQueue.QueueName],
    (queue: DelayedQueue<UserCreatedEvent>) => new UserCreatedQueue(queue),
  ),
  dx.Provide(
    UserQueueListener,
    [UserCreatedQueue],
    (userCreatedQueue: UserCreatedQueue) =>
      new UserQueueListener(userCreatedQueue),
  ),
  dx.Invoke(
    [DxLifecycle, UserQueueListener, EventService],
    (
      lifecycle: DxLifecycle,
      listener: UserQueueListener,
      events: EventService,
    ) => lifecycle.append({ onStart: () => listener.register(events) }),
  ),
);
