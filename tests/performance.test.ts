import { beforeAll, describe, expect, it } from "vitest";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";
import { retrieveCategory } from "./fixtures/categoryFixture";
import { CategoryTestService } from "./service/categoryService";

const RESPONSE_TIME_THRESHOLD_MS = 2000;

let responseTimeMs: number;
const categoryService = new CategoryTestService();

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  const start = performance.now();
  await retrieveCategory(config.APP_URL, categoryService);
  responseTimeMs = performance.now() - start;
  logger.info(`response time: ${responseTimeMs.toFixed(2)}ms`);
});

describe("Carbon Credit App tests - Performance", () => {
  it(
    `response of api responds within ${RESPONSE_TIME_THRESHOLD_MS}ms`,
    { tags: ["@regression"] },
    () => {
      expect(
        responseTimeMs,
        `Expected response time to be under ${RESPONSE_TIME_THRESHOLD_MS}ms but got ${responseTimeMs.toFixed(2)}ms`
      ).toBeLessThan(RESPONSE_TIME_THRESHOLD_MS);
    }
  );
});
