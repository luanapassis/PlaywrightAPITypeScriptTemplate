import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class GetProductRequest {
  static async getProductsWithQuery(apiContext: APIRequestContext, query: {
    _id?: string;
    nome?: string;
    preco?: number;
    descricao?: string;
    quantidade?: number;
  }): Promise<APIResponse> {
    const queryString = new URLSearchParams(
      Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
    ).toString();

    const fullUrl = `/produtos?${queryString}`;
    LoggerUtils.logParametersRequest('GET /produtos', query, fullUrl);

    const response = await apiContext.get(`/produtos?${queryString}`, {
      headers: {
        accept: 'application/json',
      },
    });

    await LoggerUtils.logResponse('GET /produtos', response);

    return response;
  }
}
