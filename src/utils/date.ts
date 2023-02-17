import { format } from 'date-fns';

export enum DateFormatsEnum {
  HOURS_MINUTES = 'hh:mm aaa',
  YEAR_MONTH_DAY = 'yyyy-MM-dd',
  FULL_DATE = 'yyyy-MM-dd hh:mm aaa',
}

export const formatDate = (date: string | number | Date, dateFormat: DateFormatsEnum) =>
  format(new Date(date), dateFormat);
