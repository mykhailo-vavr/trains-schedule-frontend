import { useMemo } from 'react';
import { apiRoutes } from '../settings';
import { useFetchApi } from './useFetchApi';
import { GetSchedulesRequest, Schedule } from '../models';

export const useGetSchedules = (params: GetSchedulesRequest) => {
  const config = useMemo(() => ({ params }), [params]);

  return useFetchApi<Schedule[], GetSchedulesRequest>(apiRoutes.SCHEDULES, config);
};
