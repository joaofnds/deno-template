import { dx } from "@pkgs/dx";
import { FetchHttpService } from "./fetch-service.ts";

export const HTTPModule = dx.Module(
  "http",
  dx.Provide(FetchHttpService, () => new FetchHttpService()),
);
