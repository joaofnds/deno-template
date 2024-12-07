import { dx } from "@pkgs/dx";
import EventEmitter from "node:events";
import { EventService } from "./service.ts";

export const EventModule = dx.Module(
  "event",
  dx.Provide(EventEmitter, () => new EventEmitter()),
  dx.Provide(
    EventService,
    [EventEmitter],
    (eventEmitter: EventEmitter) => new EventService(eventEmitter),
  ),
);
