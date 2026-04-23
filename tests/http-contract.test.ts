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

describe("Carbon Credit App tests - HTTP contract", () => {
  it(
    "responds with HTTP 200",
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(categoryService.getHttpResponseCode()).toBe(200);
    }
  );
});
