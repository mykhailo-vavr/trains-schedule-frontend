import { tokenService } from '@/services';
import { ExtendedApiRoute } from './types';
import { apiClient } from './client';
import { RequestConfig, RequestResponse } from './types/request';
import { extractRequestErrorData } from './utils';

const request = async <T = any>(
  requestHandler: (config?: RequestConfig) => Promise<RequestResponse<T>>,
  config?: RequestConfig,
) => {
  if (!config?.headers?.Authorization) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${tokenService.get.access() || ''}`;
  }

  try {
    const res = await requestHandler(config);
    return { data: res.data, res, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, res: null, error: extractRequestErrorData(e) };
  }
};

export const getApiData = async <T = any>(url: ExtendedApiRoute, config?: RequestConfig) =>
  request<T>((updatedConfig) => apiClient.get(url, updatedConfig), config);

export const postApiData = async <T = any, D = any>(url: ExtendedApiRoute, data: D, config?: RequestConfig) =>
  request<T>((updatedConfig) => apiClient.post(url, data, updatedConfig), config);

export const patchApiData = async <T = any, D = any>(url: ExtendedApiRoute, data: D, config?: RequestConfig) =>
  request<T>((updatedConfig) => apiClient.patch(url, data, updatedConfig), config);

export const deleteApiData = async <T = any>(url: ExtendedApiRoute, config?: RequestConfig) =>
  request<T>((updatedConfig) => apiClient.delete(url, updatedConfig), config);

export * from './types/request';
