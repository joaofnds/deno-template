import { Migrator } from "@mikro-orm/migrations";
import { defineConfig, MikroORM } from "@mikro-orm/postgresql";
import { User } from "../user/user.ts";
import { DatabaseConfig } from "./config.ts";

export async function newORM(config: DatabaseConfig) {
  return await MikroORM.init({
    entities: [User],
    ...defineConfig({
      clientUrl: config.url,
      extensions: [Migrator],
    }),
  });
}
