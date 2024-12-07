import { z } from "zod";
import { DatabaseConfig } from "../database/config.ts";
import { LoggerConfig } from "../logger/config.ts";
import { PokeAPIConfig } from "../pokeapi/config.ts";
import { RedisConfig } from "../redis/config.ts";

export class AppConfig {
  static readonly schema = z.object({
    logger: LoggerConfig.schema,
    database: DatabaseConfig.schema,
    redis: RedisConfig.schema,
    pokeAPI: PokeAPIConfig.schema,
  });

  constructor(
    readonly logger: LoggerConfig,
    readonly database: DatabaseConfig,
    readonly redis: RedisConfig,
    readonly pokeAPI: PokeAPIConfig,
  ) {}

  static parse(config: unknown) {
    const parsedConfig = AppConfig.schema.parse(config);

    return new AppConfig(
      LoggerConfig.fromPlain(parsedConfig.logger),
      DatabaseConfig.fromPlain(parsedConfig.database),
      RedisConfig.fromPlain(parsedConfig.redis),
      PokeAPIConfig.fromPlain(parsedConfig.pokeAPI),
    );
  }

  static envOverrides() {
    return {
      logger: LoggerConfig.envOverrides(),
      database: DatabaseConfig.envOverrides(),
      redis: RedisConfig.envOverrides(),
      pokeAPI: PokeAPIConfig.envOverrides(),
    };
  }
}
