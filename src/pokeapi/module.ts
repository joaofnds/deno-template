import { dx } from "@pkgs/dx";
import { AppConfig } from "../config/app.config.ts";
import { ConfigModule } from "../config/module.ts";
import { FetchHttpService } from "../http/fetch-service.ts";
import { HTTPModule } from "../http/http.module.ts";
import { PokeAPI } from "./api.ts";
import { PokeAPIConfig } from "./config.ts";

export const PokeAPIModule = dx.Module(
  "poke api",
  ConfigModule,
  HTTPModule,
  dx.Provide(
    PokeAPIConfig,
    [AppConfig],
    (config: AppConfig) => config.pokeAPI,
  ),
  dx.Provide(
    PokeAPI,
    [PokeAPIConfig, FetchHttpService],
    (config: PokeAPIConfig, http: FetchHttpService) =>
      new PokeAPI(config, http),
  ),
);
