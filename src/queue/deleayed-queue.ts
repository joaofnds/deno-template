import { assert } from "@std/assert";
import { Queue, QueueOptions } from "bullmq";
import { Redis } from "ioredis";
import { QueueGetter } from "./queue-getter.ts";

export class DelayedQueue<DataType = unknown> implements QueueGetter<DataType> {
  private queue?: Queue<DataType>;

  constructor(
    private readonly name: string,
    private readonly redis: Redis,
    private readonly options: Omit<QueueOptions, "connection"> = {},
  ) {}

  getQueue(): Queue<DataType> {
    assert(this.queue, `queue '${this.name}' not started`);

    return this.queue;
  }

  start() {
    this.queue = new Queue<DataType>(this.name, {
      ...this.options,
      connection: this.redis,
    });
  }

  async stop() {
    await this.queue?.close();
  }
}
