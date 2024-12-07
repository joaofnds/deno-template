import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { PokeAPI } from "../api.ts";
import { PokeAPINotFoundError } from "../errors/not-found.error.ts";
import { PokeAPITimeoutError } from "../errors/timeout.error.ts";

export class PokeAPIController {
  constructor(private readonly api: PokeAPI) {}

  register(app: Hono) {
    app.get(
      "/pokeapi/:name",
      zValidator("param", z.object({ name: z.string().min(1) })),
      async (c) => {
        const name = c.req.valid("param").name;
        try {
          const pokemon = await this.api.getPokemon(name);
          return c.json(pokemon);
        } catch (error) {
          if (error instanceof PokeAPITimeoutError) {
            return c.json({ error: "request timeout" }, 504);
          }

          if (error instanceof PokeAPINotFoundError) {
            return c.json({ error: "not found" }, 404);
          }

          return c.json({ error: "unknown error" }, 500);
        }
      },
    );
  }
}
