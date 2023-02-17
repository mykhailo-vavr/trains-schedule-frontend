import { ScheduleFormValues } from '@/components/UI/organisms/ScheduleForm/types';
import { FC } from '@/types';

type UpdateScheduleProps = { id: number };

export type UpdateScheduleFC = FC<UpdateScheduleProps>;

export type UpdateScheduleForm = ScheduleFormValues;
