import { APIRequestContext } from "@playwright/test";
import { RequestBase } from "../../bases/RequestBase";

export class GetProductRequest {
  static async getProductsWithQuery(apiContext: APIRequestContext, query: Record<string, any>) {
    return await RequestBase.get(apiContext, '/produtos', { query });
  }
}
