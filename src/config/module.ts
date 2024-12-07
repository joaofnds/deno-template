import { dx } from "@pkgs/dx";
import { AppConfig } from "./app.config.ts";
import { ConfigLoader } from "./config-loader.ts";

export const ConfigModule = dx.Module(
  "config",
  dx.Provide(AppConfig, () => ConfigLoader.fromEnv().load()),
);
