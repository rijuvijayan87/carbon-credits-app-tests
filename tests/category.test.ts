import { beforeAll, describe, expect, it } from "vitest";
import { getCategory } from "../src/index";
import type { Category } from "../src/models/category";
import { logger } from "../src/util/logger";
import { config } from "../src/config/env";

const appUrl = config.APP_URL;

logger.info(`APP_URL: ${appUrl}`);

let categoryResponse: Category;

beforeAll(async () => {
  categoryResponse = await getCategory(appUrl);
});

describe("Carbon Credit App tests - Acceptance criteria", () => {
  it("should value in 'Name = 'Carbon credits'", () => {
    expect(
      categoryResponse.Name,
      "value in name should be Carbon credits"
    ).toBe("Carbon credits");
  });

  it("should value in 'CanRelist = true", () => {
    expect(
      categoryResponse.CanRelist,
      "value in canrelist is true"
    ).toBeTruthy();
  });

  it("should Promotions element with Gallery has expected description", () => {
    const promotion = categoryResponse.Promotions.find((p) =>
      p.Description.includes("Good position in category")
    );

    expect(promotion).not.toBeNull();

    if (promotion)
      expect(promotion.Description).toBe("Good position in category");
  });
});
