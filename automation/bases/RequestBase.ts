import { APIRequestContext, APIResponse } from '@playwright/test';
import fs from 'fs';
import { LoggerUtils } from '../utils/LoggersUtils';

export class RequestBase {
  static getAuthToken(): string {
    const { token } = JSON.parse(fs.readFileSync('global-token.json', 'utf-8'));
    return token;
  }

  static buildQueryString(query?: Record<string, any>): string {
    if (!query) return '';
    const params = new URLSearchParams(
      Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
    );
    return `?${params.toString()}`;
  }

  static async get(
    apiContext: APIRequestContext,
    url: string,
    options?: {
      query?: Record<string, any>;
      headers?: Record<string, string>;
      auth?: boolean;
    }
  ): Promise<APIResponse> {
    const queryString = this.buildQueryString(options?.query);
    const fullUrl = `${url}${queryString}`;

    LoggerUtils.logParametersRequest(`GET ${url}`, options?.query ?? {}, fullUrl);

    const headers: Record<string, string> = {
      accept: 'application/json',
      ...(options?.headers ?? {}),
    };

    if (options?.auth) {
      headers['Authorization'] = this.getAuthToken();
    }

    const response = await apiContext.get(fullUrl, { headers });
    await LoggerUtils.logResponse(`GET ${url}`, response);
    return response;
  }

  static async post(
    apiContext: APIRequestContext,
    url: string,
    data: any,
    options?: {
      headers?: Record<string, string>;
      auth?: boolean;
    }
  ): Promise<APIResponse> {
    LoggerUtils.logJson(`POST ${url}`, data);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    };

    if (options?.auth) {
      headers['Authorization'] = this.getAuthToken();
    }

    const response = await apiContext.post(url, { data, headers });
    await LoggerUtils.logResponse(`POST ${url}`, response);
    return response;
  }

  static async put(
    apiContext: APIRequestContext,
    url: string,
    data: any,
    options?: {
      headers?: Record<string, string>;
      auth?: boolean;
    }
  ): Promise<APIResponse> {
    LoggerUtils.logParametersRequest(`PUT ${url}`, data);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    };

    if (options?.auth) {
      headers['Authorization'] = this.getAuthToken();
    }

    const response = await apiContext.put(url, { data, headers });
    await LoggerUtils.logResponse(`PUT ${url}`, response);
    return response;
  }

  static async delete(
    apiContext: APIRequestContext,
    url: string,
    options?: {
      query?: Record<string, any>;
      headers?: Record<string, string>;
      auth?: boolean;
    }
  ): Promise<APIResponse> {
    const queryString = options?.query
      ? `?${new URLSearchParams(options.query as any).toString()}`
      : '';

    const fullUrl = `${url}${queryString}`;

    LoggerUtils.logParametersRequest(`DELETE ${url}`, options?.query ?? {}, fullUrl);

    const headers: Record<string, string> = {
      accept: 'application/json',
      ...(options?.headers ?? {}),
    };

    if (options?.auth) {
      headers['Authorization'] = this.getAuthToken();
    }

    const response = await apiContext.delete(fullUrl, { headers });
    await LoggerUtils.logResponse(`DELETE ${url}`, response);
    return response;
  }
}

