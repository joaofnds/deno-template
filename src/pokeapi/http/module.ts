import { dx } from "@pkgs/dx";
import { Hono } from "hono";
import { HTTPServerModule } from "../../http-server/module.ts";
import { PokeAPI } from "../api.ts";
import { PokeAPIModule } from "../module.ts";
import { PokeAPIController } from "./controller.ts";

export const PokeAPIHTTPModule = dx.Module(
  "poke api http module",
  HTTPServerModule,
  PokeAPIModule,
  dx.Provide(
    PokeAPIController,
    [PokeAPI],
    (pokeAPI) => new PokeAPIController(pokeAPI),
  ),
  dx.Invoke(
    [Hono, PokeAPIController],
    (hono: Hono, controller: PokeAPIController) => controller.register(hono),
  ),
);
