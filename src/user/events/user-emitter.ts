import { EventService } from "../../event-emitter/service.ts";
import { Tail } from "../../types.ts";
import { UserCreatedEvent } from "./user-created.event.ts";

export class UserEmitter {
  private context = "UserEmitter";

  constructor(private readonly emitter: EventService) {}

  setContext(context: string) {
    this.context = context;
  }

  created(...eventData: Tail<ConstructorParameters<typeof UserCreatedEvent>>) {
    return this.emitter.emit(
      UserCreatedEvent.EventName,
      new UserCreatedEvent(this.context, ...eventData),
    );
  }
}
