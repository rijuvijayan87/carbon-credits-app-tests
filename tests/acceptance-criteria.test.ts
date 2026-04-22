import { beforeAll, describe, expect, it } from "vitest";
import { fetchCategory } from "../src/index";
import type { Category, Promotion } from "../src/index";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";

const EXPECTED_NAME = "Carbon credits";
const EXPECTED_PROMOTION_NAME = "Gallery";
const EXPECTED_PROMOTION_DESCRIPTION = "Good position in category";

let categoryResponse: Category;

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  const { category } = await fetchCategory(config.APP_URL);
  categoryResponse = category;
});

describe("Carbon Credit App tests - Acceptance criteria", () => {
  it(
    `value of field - Name is '${EXPECTED_NAME}'`,
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(categoryResponse.Name).toBe(EXPECTED_NAME);
    }
  );

  it(
    "value of field - CanRelist is true",
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(categoryResponse.CanRelist).toBe(true);
    }
  );

  it(
    `Promotions entry with Name '${EXPECTED_PROMOTION_NAME}' has Description '${EXPECTED_PROMOTION_DESCRIPTION}'`,
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      const galleryPromotion = categoryResponse.Promotions.find(
        (p: Promotion) => p.Name === EXPECTED_PROMOTION_NAME
      );

      expect(galleryPromotion).toBeDefined();
      expect(galleryPromotion?.Description).toBe(
        EXPECTED_PROMOTION_DESCRIPTION
      );
    }
  );
});
