import { HttpService } from "../http/interface.ts";
import { PokeAPIConfig } from "./config.ts";
import { PokeAPINotFoundError } from "./errors/not-found.error.ts";
import { PokeAPIError } from "./errors/pokeapi.error.ts";
import { PokeAPITimeoutError } from "./errors/timeout.error.ts";
import { PokemonSchema } from "./schemas/pokemon.schema.ts";

export class PokeAPI {
  constructor(
    private readonly config: PokeAPIConfig,
    private readonly http: HttpService,
  ) {}

  async getPokemon(name: string) {
    let res: Response;
    try {
      res = await this.http.get(`${this.config.baseURL}/pokemon/${name}`, {
        signal: AbortSignal.timeout(this.config.timeoutMilliseconds),
      });
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw new PokeAPIError(`unknown request error: ${error}`);
      }

      if (error instanceof Error && error.name === "TimeoutError") {
        throw new PokeAPITimeoutError(error.message);
      }

      throw new PokeAPIError(error.message);
    }

    if (res.status === 404) {
      await res.body?.cancel();
      throw new PokeAPINotFoundError(name);
    }

    let body: unknown;
    try {
      body = await res.json();
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw new PokeAPIError(`unknown json parse error: ${error}`);
      }

      throw new PokeAPIError(`failed to parse json: ${error.message}`);
    }

    const parseResult = PokemonSchema.safeParse(body);
    if (parseResult.success === false) {
      throw new PokeAPIError(
        `failed to parse response body: ${parseResult.error.message}`,
      );
    }

    return parseResult.data;
  }
}
