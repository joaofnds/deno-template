import { assert } from "@std/assert";
import { EventService } from "../../event-emitter/service.ts";
import { UserCreatedEvent } from "../events/user-created.event.ts";
import { UserCreatedQueue } from "./user-created.queue.ts";

export class UserQueueListener {
  constructor(private readonly userCreatedQueue: UserCreatedQueue) {}

  register(eventService: EventService) {
    eventService.on(
      UserCreatedEvent.EventName,
      (e) => {
        assert(e instanceof UserCreatedEvent);
        this.userCreatedQueue.schedule(e);
      },
    );
  }
}
