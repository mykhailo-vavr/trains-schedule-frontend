import { apiRoutes } from '../settings';
import { getApiData, postApiData, patchApiData, deleteApiData } from '../request';
import { CreateScheduleRequest, UpdateScheduleRequest, Schedule } from '../models';

export const scheduleService = {
  async getByPk(id: number) {
    return getApiData<Schedule>(`${apiRoutes.SCHEDULES}/${id}`);
  },

  async create(body: CreateScheduleRequest) {
    return postApiData<Schedule>(apiRoutes.SCHEDULES, body);
  },

  async update(id: number, body: UpdateScheduleRequest) {
    return patchApiData<Schedule>(`${apiRoutes.SCHEDULES}/${id}`, body);
  },

  async delete(id: number) {
    return deleteApiData(`${apiRoutes.SCHEDULES}/${id}`);
  },
};
