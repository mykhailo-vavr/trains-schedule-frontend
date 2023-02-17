import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '../models';

export interface RequestConfig<P = any> extends AxiosRequestConfig {
  params: P;
}

export type RequestError = AxiosError<ApiError>;

export type RequestResponse<T = any> = AxiosResponse<T>;
