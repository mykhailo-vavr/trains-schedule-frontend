import { Schedule } from '@/api';
import { Train } from '@/api/models/Train';
import { ColumnsType, FC } from '@/types';

export type ScheduleColumnsType = ColumnsType<
  Pick<Schedule, 'id' | 'departure' | 'arrival' | 'departureTime' | 'arrivalTime'> & { trainName: Train['name'] }
>;

export type ScheduleFC = FC;
