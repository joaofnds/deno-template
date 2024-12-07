import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
import { UserCreatedEvent } from "../events/user-created.event.ts";
import { UserMetric } from "./metrics.enum.ts";

@Injectable()
export class MetricsUserListener {
  constructor(
    @InjectMetric(
      UserMetric.UsersCreatedTotal,
    ) private readonly usersCreatedCounter: Counter<string>,
  ) {}

  @OnEvent(UserCreatedEvent.EventName)
  onUserCreated() {
    this.usersCreatedCounter.inc();
  }
}
