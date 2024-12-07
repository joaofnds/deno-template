import { Migrator } from "@mikro-orm/migrations";
import { dx } from "@pkgs/dx";
import { Command, InvalidArgumentError } from "commander";
import { DatabaseModule } from "./database/module.ts";

async function withMigrator(f: (migrator: Migrator) => unknown) {
  const app = dx.App(DatabaseModule);
  await app.start();
  await f(app.get(Migrator));
  await app.stop();
}

function parseInteger(value: string) {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

type MigratorOptions = { name?: string; to?: number };

function parseOptions(options: MigratorOptions) {
  if (options.name !== undefined) return options.name;
  if (options.to !== undefined) return { to: options.to };
  return undefined;
}

const program = new Command();

program
  .name("migrate")
  .description("run Mikro-ORM migrations")
  .version("0.0.1");

program
  .command("up")
  .option("-n, --name [migration]", "runs only given migration, up")
  .option(
    "-t, --to [migration]",
    "runs migrations up to given version",
    parseInteger,
  )
  .action(async (opt: MigratorOptions) => {
    await withMigrator(async (m) => await m.up(parseOptions(opt)));
  });

program
  .command("down")
  .option("-n, --name [migration]", "runs only given migration, up")
  .option(
    "-t, --to [migration]",
    "runs migrations up to given version",
    parseInteger,
  )
  .action(async (opt) => {
    await withMigrator(async (m) => await m.down(parseOptions(opt)));
  });

program.command("check").action(async () => {
  await withMigrator(async (m) =>
    console.log(
      "migration needed?",
      await m.checkMigrationNeeded(),
    )
  );
});

program
  .command("create")
  .argument("<name>", "name of the migration")
  .action((name) =>
    withMigrator((m) =>
      m.createMigration("./src/migrations", true, false, name)
    )
  );

program.parse();
