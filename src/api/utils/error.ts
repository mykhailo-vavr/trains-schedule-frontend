import { ApiError } from '../models/ApiError';
import { RequestError } from '../types/request';

export const baseApiError: ApiError = {
  error: 'Internal Server Error',
  message: 'Unknown server error',
  statusCode: 500,
};

export const extractRequestErrorData = (error: unknown) => (error as RequestError).response?.data || baseApiError;
