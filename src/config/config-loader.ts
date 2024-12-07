import { assert } from "@std/assert";
import * as fs from "@std/fs";
import * as yaml from "@std/yaml";
import _ from "lodash";
import { AppConfig } from "./app.config.ts";

export class ConfigLoader {
  private readonly localConfigPath = "src/config/local.yaml";

  constructor(private readonly configPath: string) {
    assert(fs.existsSync(configPath), `config file not found: ${configPath}`);
  }

  static fromEnv() {
    const configPath = Deno.env.get("CONFIG_PATH");
    assert(configPath, "CONFIG_PATH is required");

    return new ConfigLoader(configPath);
  }

  load() {
    const config = this.readYAML(this.configPath);

    if (fs.existsSync(this.localConfigPath)) {
      _.merge(config, this.readYAML(this.localConfigPath));
    }

    _.merge(config, AppConfig.envOverrides());

    return AppConfig.parse(config);
  }

  private readYAML(path: string) {
    return yaml.parse(Deno.readTextFileSync(path));
  }
}
