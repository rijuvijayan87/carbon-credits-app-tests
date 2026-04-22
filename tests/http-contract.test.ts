import { beforeAll, describe, expect, it } from "vitest";
import { fetchCategory } from "../src/index";
import type { CategoryResponse } from "../src/index";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";

let response: CategoryResponse;

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  response = await fetchCategory(config.APP_URL);
});

describe("Carbon Credit App tests - HTTP contract", () => {
  it(
    "responds with HTTP 200",
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(response.statusCode).toBe(200);
    }
  );
});
