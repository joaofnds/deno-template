import { dx } from "@pkgs/dx";
import { EventModule } from "../../event-emitter/module.ts";
import { EventService } from "../../event-emitter/service.ts";
import { UserEmitter } from "./user-emitter.ts";

export const UserEventModule = dx.Module(
  "user-event",
  EventModule,
  dx.Provide(
    UserEmitter,
    [EventService],
    (eventService: EventService) => new UserEmitter(eventService),
  ),
);
