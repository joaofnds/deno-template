import { User } from "../user.ts";

export class UserCreatedEvent {
  static readonly EventName = "user.created";

  constructor(
    readonly context: string,
    readonly user: User,
  ) {}
}
