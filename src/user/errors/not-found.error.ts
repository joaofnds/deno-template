import { UserError } from "./user-error.ts";

export class NotFoundError extends UserError {
  override readonly name = "NotFoundError";

  constructor(userID: string) {
    super(`user not found: ${userID}`);
  }
}
