import pino from "pino";
import { z } from "zod";

export class LoggerConfig {
  static readonly schema = z.object({
    level: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  });

  constructor(
    readonly level: pino.Level,
  ) {}

  static fromPlain(config: z.infer<typeof LoggerConfig.schema>) {
    return new LoggerConfig(config.level);
  }

  static envOverrides() {
    return {};
  }
}
