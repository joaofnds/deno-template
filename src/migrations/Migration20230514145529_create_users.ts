import { Migration } from "@mikro-orm/migrations";

export class Migration20230514145529 extends Migration {
  up() {
    this.addSql(
      `CREATE TABLE "users"(
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL
      );`,
    );
  }

  override down() {
    this.addSql('DROP TABLE "users"');
  }
}
