import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class LoginRequest {
  static async login(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    LoggerUtils.logPayloadRequest('POST /login', data);

    const response = await apiContext.post('/login', {
      data: data,
    });

    await LoggerUtils.logResponse('POST /login', response);

    return response;
  }
}
