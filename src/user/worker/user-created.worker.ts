import { Job, Worker } from "bullmq";
import { Redis } from "ioredis";
import { Logger } from "pino";
import { UserCreatedEvent } from "../events/user-created.event.ts";
import { UserCreatedQueue } from "../queue/user-created.queue.ts";

export class UserCreatedWorker {
  private worker?: Worker<UserCreatedEvent>;

  constructor(
    private readonly redis: Redis,
    private readonly logger: Logger,
  ) {}

  start() {
    this.worker = new Worker(
      UserCreatedQueue.QueueName,
      this.process.bind(this),
      { autorun: false, connection: this.redis },
    );

    return new Promise<void>((resolve) => {
      this.worker?.on("ready", () => resolve());
      this.worker?.run();
    });
  }

  async stop() {
    await this.worker?.close();
  }

  process(job: Job<UserCreatedEvent>) {
    this.logger.info(job.data, "🎉🎉🎉🎉🎉🎉 user created 🎉🎉🎉🎉🎉🎉🎉");
    return Promise.resolve();
  }
}
