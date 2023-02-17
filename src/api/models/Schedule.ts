import { Train } from './Train';

export type Schedule = {
  id: number;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  trainId: number;
  train: Train;
};
