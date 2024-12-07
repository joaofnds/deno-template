import { Migration } from "@mikro-orm/migrations";

export class Migration20230514145529 extends Migration {
  up() {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  override down() {
    this.addSql('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
