import { FormInstance } from 'antd';
import { FC } from '@/types';
import { FormProps } from '../Form/types';

export type ScheduleFormValues = {
  departure: string;
  arrival: string;
  dates: [Date, Date];
  trainName: string;
};

export interface ScheduleFormProps extends FormProps {
  errorMessage: string;
  data?: ScheduleFormValues;
  form: FormInstance<ScheduleFormValues>;
}

export type ScheduleFormFC = FC<ScheduleFormProps>;
