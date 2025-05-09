import { APIRequestContext, APIResponse } from '@playwright/test';
import fs from 'fs';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class PostCartRequest {
  static async createCart(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    LoggerUtils.logPayloadRequest('POST /carrinhos', data);

    const { token } = JSON.parse(fs.readFileSync('global-token.json', 'utf-8'));

    const response = await apiContext.post('/carrinhos', {
      data,
      headers: {
        Authorization: token,
      },
    });

    await LoggerUtils.logResponse('POST /carrinhos', response);

    return response;
  }
}
