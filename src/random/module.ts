import { dx } from "@pkgs/dx";
import { RandomService } from "./service.ts";

export const RandomModule = dx.Module(
  "random",
  dx.Provide(RandomService, () => new RandomService()),
);
