import { time } from "../../lib/time.ts";
import { QueueGetter } from "../../queue/queue-getter.ts";
import { UserCreatedEvent } from "../events/user-created.event.ts";

export class UserCreatedQueue {
  static readonly QueueName = "user.created";

  constructor(private readonly getter: QueueGetter<UserCreatedEvent>) {}

  async schedule(event: UserCreatedEvent) {
    await this.getter.getQueue().add(UserCreatedQueue.QueueName, event, {
      jobId: event.user.id,
      removeOnComplete: true,
      attempts: 5,
      backoff: { type: "fixed", delay: 5 * time.Second },
    });
  }
}
