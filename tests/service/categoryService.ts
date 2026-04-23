import {
  CategoryResponse,
  fetchCategory,
  Promotion,
  type Category,
} from "../../src";

export class CategoryTestService {
  private response: CategoryResponse | null = null;

  async callApiAndFetchCategory(url: string): Promise<CategoryResponse> {
    this.response = await fetchCategory(url);
    return this.response;
  }

  getHttpResponseCode(): number {
    return this.hasApiCalled().statusCode;
  }

  getCategoryField<k extends keyof Category>(field: k): Category[k] {
    return this.hasApiCalled().category[field];
  }

  findPromptionForName(promotions: Promotion[], promotionName: string) {
    return promotions.find((p: Promotion) => p.Name === promotionName);
  }

  private hasApiCalled(): CategoryResponse {
    if (!this.response) {
      throw new Error(
        "CategoryTestService not loaded. Call retrieveCategory() in beforeAll"
      );
    }
    return this.response;
  }
}
