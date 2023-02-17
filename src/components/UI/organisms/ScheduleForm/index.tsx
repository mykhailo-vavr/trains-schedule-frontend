import { useFormFieldsSchema, useYupSchema } from '@/hooks';
import { useEffect } from 'react';
import { Input, RangePicker } from '../../atoms';
import { FormItem } from '../../molecules';
import Form from '../Form';
import { ScheduleFormFC } from './types';

const ScheduleForm: ScheduleFormFC = ({ data, form, errorMessage, ...props }) => {
  const { requiredString, requiredArray } = useFormFieldsSchema();

  const schema = useYupSchema({
    departure: requiredString,
    arrival: requiredString,
    dates: requiredArray,
    trainName: requiredString,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Form form={form} layout="vertical" {...props}>
      <FormItem name="departure" schema={schema} label="Departure">
        <Input placeholder="Enter departure place" />
      </FormItem>
      <FormItem name="arrival" schema={schema} label="Arrival">
        <Input placeholder="Enter arrival place" />
      </FormItem>
      <FormItem name="dates" schema={schema} label="Departure and arrival time">
        <RangePicker showTime />
      </FormItem>
      <FormItem name="trainName" schema={schema} label="Train name">
        <Input placeholder="Enter train name" />
      </FormItem>

      <div className="error">{errorMessage || ''}</div>
    </Form>
  );
};

export default ScheduleForm;
