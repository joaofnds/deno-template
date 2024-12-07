import { UserError } from "./user-error.ts";

export class RepositoryError extends UserError {
  override readonly name = "RepositoryError";
}
