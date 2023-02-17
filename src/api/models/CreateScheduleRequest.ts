import { Schedule } from './Schedule';
import { Train } from './Train';

export type CreateScheduleRequest = Pick<Schedule, 'departure' | 'arrival' | 'departureTime' | 'arrivalTime'> & {
  train: Pick<Train, 'name'>;
};
