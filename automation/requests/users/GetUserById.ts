import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class GetUserByIdRequest {
  static async getUserById(apiContext: APIRequestContext, userId: string): Promise<APIResponse> {
    const endpoint = `/usuarios/${userId}`;
    
    LoggerUtils.logParametersRequest('GET /usuarios/:id', { id: userId }, endpoint);

    const response = await apiContext.get(endpoint, {
      headers: {
        accept: 'application/json',
      },
    });

    await LoggerUtils.logResponse('GET /usuarios/:id', response);

    return response;
  }
}
