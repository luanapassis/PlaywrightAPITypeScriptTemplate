import { APIRequestContext, APIResponse } from '@playwright/test';
import { RequestBase } from '../../bases/RequestBase';

export class PostCartRequest {
    static async createCart(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    return await RequestBase.post(apiContext, '/carrinhos', data, { auth: true });
  }
}