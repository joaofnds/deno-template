import { dx } from "@pkgs/dx";
import { pino } from "pino";
import { AppConfig } from "../config/app.config.ts";
import { ConfigModule } from "../config/module.ts";
import { LoggerConfig } from "./config.ts";

export const LoggerModule = dx.Module(
  "logger",
  ConfigModule,
  dx.Provide(
    LoggerConfig,
    [AppConfig],
    (config: AppConfig) => config.logger,
  ),
  dx.Provide(
    "logger",
    [LoggerConfig],
    (config: LoggerConfig) => pino({ level: config.level }),
  ),
);
