import { expect } from "@std/expect/expect";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  it,
} from "@std/testing/bdd";
import { TestHarness } from "../harness.ts";

describe("/users", () => {
  let harness: TestHarness;

  beforeAll(async () => {
    harness = await TestHarness.setup();
  });

  beforeEach(async () => {
    await harness.db.begin();
  });

  afterEach(async () => {
    await harness.db.rollback();
  });

  afterAll(async () => {
    await harness.teardown();
  });

  it("create user", async () => {
    const name = "joao";
    const user = await harness.driver.users.create(name);
    expect(user.name).toEqual(name);
  });

  it("finds created user", async () => {
    const user = await harness.driver.users.create("joao");
    const found = await harness.driver.users.find(user.id);
    expect(found).toEqual(user);
  });

  it("validates user id", async () => {
    await harness.driver.users.create("joao");

    const response = await harness.driver.users.findReq("invalid-id");
    expect(response.status).toEqual(400);

    const body = await response.json();
    expect(body).toEqual({
      success: false,
      error: {
        name: "ZodError",
        issues: [
          {
            validation: "uuid",
            code: "invalid_string",
            message: "Invalid uuid",
            path: ["id"],
          },
        ],
      },
    });
  });

  it("lists created users", async () => {
    const user = await harness.driver.users.create("joao");
    const users = await harness.driver.users.list();
    expect(users).toContainEqual(user);
  });

  describe("when name is not provided", () => {
    it("returns bad request", async () => {
      const response = await harness.driver.users.createReq("");
      expect(response.status).toEqual(400);

      const body = await response.json();
      expect(body).toMatchObject({
        success: false,
        error: {
          name: "ZodError",
          issues: [
            {
              code: "too_small",
              minimum: 3,
              type: "string",
              inclusive: true,
              exact: false,
              message: "String must contain at least 3 character(s)",
              path: ["name"],
            },
          ],
        },
      });
    });
  });
});
