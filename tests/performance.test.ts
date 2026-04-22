import { beforeAll, describe, expect, it } from "vitest";
import { fetchCategory } from "../src/index";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";

const RESPONSE_TIME_THRESHOLD_MS = 2000;

let responseTimeMs: number;

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  const start = performance.now();
  await fetchCategory(config.APP_URL);
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
