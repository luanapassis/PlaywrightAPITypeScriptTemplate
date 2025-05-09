import { APIRequestContext, APIResponse } from '@playwright/test';
import { RequestBase } from '../../bases/RequestBase';

export class PostUserRequest {
  static async createUser(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    return await RequestBase.post(apiContext, '/usuarios', data);
  }
}
