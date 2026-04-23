import { beforeAll, describe, expect, it } from "vitest";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";
import { retrieveCategory } from "./fixtures/categoryFixture";
import { CategoryTestService } from "./service/categoryService";

const categoryService = new CategoryTestService();

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  await retrieveCategory(config.APP_URL, categoryService);
});

describe("Carbon Credit App tests - Field contract", () => {
  it("path is a non empty string", { tags: ["@regression"] }, () => {
    const categoryValue = categoryService.getCategoryField("Path");

    expect(typeof categoryValue).toBe("string");
    expect(categoryValue.length).toBeGreaterThan(0);
  });

  it(
    "promotions is an array and is non empty",
    { tags: ["@sanity", "@regression"] },
    () => {
      const actualPromptionArray =
        categoryService.getCategoryField("Promotions");

      expect(Array.isArray(actualPromptionArray)).toBe(true);
      expect(actualPromptionArray.length).toBeGreaterThan(0);
    }
  );
});
