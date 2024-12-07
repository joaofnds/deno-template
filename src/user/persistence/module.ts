import { EntityManager } from "@mikro-orm/core";
import { dx } from "@pkgs/dx";
import { DatabaseModule } from "../../database/module.ts";
import { MikroUserRepository } from "./mikro.repository.ts";

export const UserPersistenceModule = dx.Module(
  "user-persistence",
  DatabaseModule,
  dx.Provide(
    MikroUserRepository,
    [EntityManager],
    (em: EntityManager) => new MikroUserRepository(em),
  ),
);
