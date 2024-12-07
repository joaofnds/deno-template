import { relative } from "@std/path";
import nock from "nock";

export class RequestRecorder {
  private nockBack?: { nockDone: () => void };

  async setup() {
    nock.back.fixtures = "test/nock/fixtures";
    nock.back.setMode(this.getMode());

    this.nockBack = await nock.back(this.fixturePath(), {
      after: () => nock.enableNetConnect("127.0.0.1"),
      afterRecord: (outputs) =>
        outputs.filter((o) => !o.scope.toString().includes("127.0.0.1")),
    });
  }

  teardown() {
    this.nockBack?.nockDone();
    nock.restore();
    nock.cleanAll();
  }

  private fixturePath() {
    const match = new Error().stack?.match(/file:\/\/(.*)\.test\.ts:\d+:\d+/);
    if (!match?.[1]) {
      throw new Error("Could not extract file path from stack");
    }

    return relative(Deno.cwd(), match[1] + ".json");
  }

  private getMode() {
    const nockMode = Deno.env.get("NOCK_MODE");
    switch (nockMode) {
      case "wild":
      case "dryrun":
      case "record":
      case "update":
      case "lockdown":
        return nockMode;
      default:
        // defaulting to wild for now because of https://github.com/nock/nock/issues/2819
        // return "lockdown";
        return "wild";
    }
  }
}
