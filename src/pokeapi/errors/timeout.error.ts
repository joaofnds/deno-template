import { PokeAPIError } from "./pokeapi.error.ts";

export class PokeAPITimeoutError extends PokeAPIError {
  override readonly name = "PokeAPITimeoutError";
}
