import { EntityManager, MikroORM } from "@mikro-orm/core";
import { DxApp } from "@pkgs/dx";

export class DBHarness {
  constructor(
    private readonly orm: MikroORM,
    private readonly entityManager: EntityManager,
  ) {}

  static for(app: DxApp): DBHarness {
    return new DBHarness(app.get(MikroORM), app.get(EntityManager));
  }

  async begin() {
    await this.entityManager.begin();
  }

  async rollback(): Promise<void> {
    await this.entityManager.rollback();
  }

  async clean(): Promise<void> {
    await this.orm.schema.clearDatabase();
  }
}
