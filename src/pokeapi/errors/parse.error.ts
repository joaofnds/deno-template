import { PokeAPIError } from "./pokeapi.error.ts";

export class PokeAPIParseError extends PokeAPIError {
  readonly name = "PokeAPIParseError";
}
