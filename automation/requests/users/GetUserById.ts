import { APIRequestContext, APIResponse } from '@playwright/test';
import { RequestBase } from '../../bases/RequestBase';

export class GetUserByIdRequest {
  static async getUserById(apiContext: APIRequestContext, userId: string): Promise<APIResponse> {
    return await RequestBase.get(apiContext, `/usuarios/${userId}`);
  }
}
