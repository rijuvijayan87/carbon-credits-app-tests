import { beforeAll, describe, expect, it } from "vitest";
import { getCategory } from "../index.js";
import type { Category } from "../models/category.js";
import { getEnvVariable } from "../config/environment.js";

const url = getEnvVariable("APP_URL");
console.log(`APP URL: ${url}`);

let categoryResponse: Category;

beforeAll(async () => {
  categoryResponse = await getCategory(url);
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
