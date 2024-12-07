import { expect } from "@std/expect/expect";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { TestHarness } from "../harness.ts";

describe("/health", () => {
  let harness: TestHarness;

  beforeAll(async () => {
    harness = await TestHarness.setup();
  });

  afterAll(async () => {
    await harness.teardown();
  });

  it("/health", async () => {
    const res = await harness.driver.health();

    expect(res.status).toEqual(200);

    const body = await res.json();
    expect(body.postgres).toBe("up");
    expect(body.redis).toBe("up");
  });
});
