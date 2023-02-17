'use client';

import { useCallback, useEffect, useState } from 'react';
import { ExtendedApiRoute, RequestConfig } from '../types';
import { ApiError } from '../models';
import { getApiData } from '../request';

export const useFetchApi = <T, P = any>(url: ExtendedApiRoute, initialConfig?: RequestConfig<P>) => {
  const [loading, toggle] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(
    async (config?: RequestConfig<P>) => {
      toggle(true);
      const res = await getApiData<T>(url, config);

      setData(res.data);
      setError(res.error);

      toggle(false);
    },
    [url],
  );

  useEffect(() => {
    fetchData(initialConfig).catch(() => {});
  }, [initialConfig]);

  return { data, error, loading, refetch: fetchData };
};
