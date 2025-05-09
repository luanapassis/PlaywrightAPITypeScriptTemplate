import { APIRequestContext, APIResponse } from '@playwright/test';
import { RequestBase } from '../../bases/RequestBase';

export class PostPetRequest {
  static async createPet(apiContext: APIRequestContext, data: any): Promise<APIResponse> {
    return await RequestBase.post(apiContext, '/v2/pet', data);
  }
}
