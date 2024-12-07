import { dx, DxApp } from "@pkgs/dx";
import { AppModule } from "../src/main.module.ts";
import { DBHarness } from "./db-harness.ts";
import { ApplicationDriver } from "./driver/application.driver.ts";
import { RequestRecorder } from "./nock/recorder.ts";

type TestHarnessConfig = {
  useRequestRecorder?: boolean;
};

export class TestHarness {
  readonly driver: ApplicationDriver;
  readonly db: DBHarness;
  readonly recorder?: RequestRecorder;

  constructor(
    readonly app: DxApp,
    config?: TestHarnessConfig,
  ) {
    this.driver = ApplicationDriver.for(app);
    this.db = DBHarness.for(app);
    if (config?.useRequestRecorder) this.recorder = new RequestRecorder();
  }

  static async setup(config?: TestHarnessConfig) {
    const app = dx.App(AppModule);

    const harness = new TestHarness(app, config);
    await harness.setup();
    return harness;
  }

  async setup() {
    await this.app.start();
    await this.recorder?.setup();
  }

  async teardown() {
    await this.app.stop();
    await this.recorder?.teardown();
  }
}
