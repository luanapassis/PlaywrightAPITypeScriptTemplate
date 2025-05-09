import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoggerUtils } from '../../utils/LoggersUtils';

export class PostPetRequest {
  static async createPet(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    LoggerUtils.logPayloadRequest('POST /v2/pet', data);

    const response = await apiContext.post('/v2/pet', {
      data,
    });

    await LoggerUtils.logResponse('POST /v2/pet', response);

    return response;
  }
}

