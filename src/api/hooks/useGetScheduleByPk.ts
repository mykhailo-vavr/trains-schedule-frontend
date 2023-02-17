import { apiRoutes } from '../settings';
import { useFetchApi } from './useFetchApi';
import { Schedule } from '../models';

export const useGetScheduleByPk = (id: number) => useFetchApi<Schedule>(`${apiRoutes.SCHEDULES}/${id}`);
