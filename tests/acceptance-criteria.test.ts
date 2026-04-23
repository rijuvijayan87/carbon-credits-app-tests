import { beforeAll, describe, expect, it } from "vitest";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";
import { retrieveCategory } from "./fixtures/categoryFixture";
import { CategoryTestService } from "./service/categoryService";

const EXPECTED_NAME = "Carbon credits";
const EXPECTED_PROMOTION_NAME = "Gallery";
const EXPECTED_PROMOTION_DESCRIPTION = "Good position in category";

const categoryService = new CategoryTestService();

beforeAll(async () => {
  logger.info(`fetching category from: ${config.APP_URL}`);
  await retrieveCategory(config.APP_URL, categoryService);
});

describe("Carbon Credit App tests - Acceptance criteria", () => {
  it(
    `value of field - Name is '${EXPECTED_NAME}'`,
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(categoryService.getCategoryField("Name")).toBe(EXPECTED_NAME);
    }
  );

  it(
    "value of field - CanRelist is true",
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      expect(categoryService.getCategoryField("CanRelist")).toBe(true);
    }
  );

  it(
    `Promotions entry with Name '${EXPECTED_PROMOTION_NAME}' has Description '${EXPECTED_PROMOTION_DESCRIPTION}'`,
    { tags: ["@smoke", "@sanity", "@regression"] },
    () => {
      const galleryPromotion = categoryService.findPromptionForName(
        categoryService.getCategoryField("Promotions"),
        EXPECTED_PROMOTION_NAME
      );

      expect(galleryPromotion).toBeDefined();
      expect(galleryPromotion?.Description).toBe(
        EXPECTED_PROMOTION_DESCRIPTION
      );
    }
  );
});
