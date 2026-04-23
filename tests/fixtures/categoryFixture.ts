import { CategoryResponse } from "../../src";
import { CategoryTestService } from "../service/categoryService";

export const retrieveCategory = async (
  url: string,
  categoryService: CategoryTestService
): Promise<CategoryResponse> => {
  return await categoryService.callApiAndFetchCategory(url);
};
