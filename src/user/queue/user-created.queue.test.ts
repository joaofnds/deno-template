import { expect, fn } from "@std/expect";
import { beforeAll, beforeEach, describe, it } from "@std/testing/bdd";
import { Queue } from "bullmq";
import { randomUUID } from "node:crypto";
import { UserCreatedEvent } from "../events/user-created.event.ts";
import { User } from "../user.ts";
import { UserCreatedQueue } from "./user-created.queue.ts";

describe(UserCreatedQueue.name, () => {
  let queue: UserCreatedQueue;
  const bullQueue = { add: fn() };
  const event = new UserCreatedEvent(
    "UserCreatedQueueTest",
    new User(randomUUID(), "test"),
  );

  beforeAll(() => {
    queue = new UserCreatedQueue(
      { getQueue: () => bullQueue as Queue<UserCreatedEvent> },
    );
  });

  beforeEach(() => {
    bullQueue.add = fn();
  });

  it("enqueues a job with the event", async () => {
    await queue.schedule(event);

    expect(bullQueue.add).toHaveBeenCalledWith(
      "user.created",
      event,
      expect.anything(),
    );
  });

  const tests = [
    { name: "sets job id to user id", spec: { jobId: event.user.id } },
    { name: "sets attempts to 5", spec: { attempts: 5 } },
    { name: "removes the job on complete", spec: { removeOnComplete: true } },
    {
      name: "configures backoff",
      spec: { backoff: { type: "fixed", delay: 5000 } },
    },
  ];

  for (const { name, spec } of tests) {
    it(name, async () => {
      await queue.schedule(event);

      expect(bullQueue.add).toHaveBeenCalledWith(
        "user.created",
        expect.any(UserCreatedEvent),
        expect.objectContaining(spec),
      );
    });
  }
});
