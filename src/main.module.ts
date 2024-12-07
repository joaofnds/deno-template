import { dx } from "@pkgs/dx";
import { HealthModule } from "./health/module.ts";
import { PokeAPIHTTPModule } from "./pokeapi/http/module.ts";
import { QueueModule } from "./queue/queue.module.ts";
import { UserHTTPModule } from "./user/http/module.ts";

export const AppModule = dx.Module(
  "app module",
  HealthModule,
  QueueModule,
  UserHTTPModule,
  PokeAPIHTTPModule,
);
