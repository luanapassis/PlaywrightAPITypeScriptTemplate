import { APIRequestContext, APIResponse } from '@playwright/test';
import { RequestBase } from '../../bases/RequestBase';

export class LoginRequest {
  static async login(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    return await RequestBase.post(apiContext, '/login', data);
  }
}
