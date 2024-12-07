import { PokeAPIError } from "./pokeapi.error.ts";

export class PokeAPINotFoundError extends PokeAPIError {
  override readonly name = "PokeAPINotFoundError";

  constructor(readonly pokemon: string) {
    super(`pokemon "${pokemon}" not found`);
  }
}
