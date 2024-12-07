import { EntityManager, MikroORM } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { dx, DxLifecycle } from "@pkgs/dx";
import { AppConfig } from "../config/app.config.ts";
import { ConfigModule } from "../config/module.ts";
import { UserSchema } from "../user/persistence/schema.ts";
import { DatabaseConfig } from "./config.ts";
import { PostgresHealthIndicator } from "./postgres-indicator.ts";

const Providers = dx.Options(
  dx.Provide(
    DatabaseConfig,
    [AppConfig],
    (config: AppConfig) => config.database,
  ),
  dx.Provide(
    MikroORM,
    [DatabaseConfig],
    (config: DatabaseConfig) =>
      MikroORM.initSync({
        entities: [UserSchema],
        ...defineConfig({
          clientUrl: config.url,
          extensions: [Migrator],
        }),
      }),
  ),
  dx.Provide(
    EntityManager,
    [MikroORM],
    (orm: MikroORM) => orm.em,
  ),
  dx.Provide(
    Migrator,
    [MikroORM],
    (orm: MikroORM) => orm.getMigrator(),
  ),
  dx.Provide(
    PostgresHealthIndicator,
    [EntityManager],
    (em: EntityManager) => new PostgresHealthIndicator(em),
  ),
);

const Invokes = dx.Options(
  dx.Invoke(
    [DxLifecycle, MikroORM],
    (lifecycle: DxLifecycle, orm: MikroORM) =>
      lifecycle.append({ onStop: () => orm.close() }),
  ),
);

export const DatabaseModule = dx.Module(
  "database",
  ConfigModule,
  Providers,
  Invokes,
);
