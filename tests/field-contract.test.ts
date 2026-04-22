import { beforeAll, describe, expect, it } from "vitest";
import { fetchCategory } from "../src/index";
import type { Category } from "../src/index";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";

let categoryResponse: Category;

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  const { category } = await fetchCategory(config.APP_URL);
  categoryResponse = category;
});

describe("Carbon Credit App tests - Field contract", () => {
  it("path is a non empty string", { tags: ["@regression"] }, () => {
    expect(typeof categoryResponse.Path).toBe("string");
    expect(categoryResponse.Path.length).toBeGreaterThan(0);
  });

  it(
    "promotions is an array and is non empty",
    { tags: ["@sanity", "@regression"] },
    () => {
      expect(Array.isArray(categoryResponse.Promotions)).toBe(true);
      expect(categoryResponse.Promotions.length).toBeGreaterThan(0);
    }
  );
});
