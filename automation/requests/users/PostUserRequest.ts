import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class PostUserRequest {
  static async createUser(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    LoggerUtils.logPayloadRequest('POST /usuarios', data);

    const response = await apiContext.post('/usuarios', {
      data,
    });

    await LoggerUtils.logResponse('POST /usuarios', response);

    return response;
  }
}
