import { APIRequestContext } from '@playwright/test';
import { GetProductRequest } from '../../requests/products/GetProductsRequest';

export class GetProductStep {
  static async getFirstProductIdByQuery(
    apiContext: APIRequestContext,
    query: {
      _id?: string;
      nome?: string;
      preco?: number;
      descricao?: string;
      quantidade?: number;
    }
  ): Promise<string> {
    const response = await GetProductRequest.getProductsWithQuery(apiContext, query);

    if (response.status() !== 200) {
      throw new Error(`❌ Failed to get products: ${response.status()}`);
    }

    const body = await response.json();

    if (!body.produtos || body.produtos.length === 0) {
      throw new Error('❌ No products found with the given query.');
    }

    return body.produtos[0]._id;
  }
}
