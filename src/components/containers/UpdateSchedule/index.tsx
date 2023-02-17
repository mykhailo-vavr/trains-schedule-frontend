'use client';

import { useForm, useToggle } from '@/hooks';
import { Button, Link } from '@/components/UI/atoms';
import { useCallback, useMemo, useState } from 'react';
import { redirect } from '@/utils';
import { webRoutes } from '@/settings';
import { scheduleService, useGetScheduleByPk } from '@/api';
import { ScheduleForm } from '@/components/UI/organisms';
import { useRouter } from 'next/navigation';
import { UpdateScheduleFC, UpdateScheduleForm } from './types';
import { Wrapper } from './styles';

const UpdateSchedule: UpdateScheduleFC = ({ id }) => {
  const { data, loading: getScheduleLoading } = useGetScheduleByPk(id);
  const [form] = useForm<UpdateScheduleForm>();
  const [loading, toggleLoading] = useToggle();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const transformedData: UpdateScheduleForm = useMemo(() => {
    if (getScheduleLoading) {
      return { departure: '', arrival: '', dates: [new Date(), new Date()], trainName: '' };
    }

    if (!data) {
      return redirect();
    }

    const { departure, arrival, departureTime, arrivalTime, train } = data;

    return {
      departure,
      arrival,
      dates: [new Date(departureTime), new Date(arrivalTime)],
      trainName: train.name,
    };
  }, [data, getScheduleLoading]);

  const onClick = useCallback(() => {
    (async () => {
      try {
        toggleLoading();

        await form.validateFields();

        const { dates, trainName, ...schedule } = form.getFieldsValue();
        const [departureTime, arrivalTime] = dates;

        if (!data) {
          return;
        }

        const { error } = await scheduleService.update(data.id, {
          ...schedule,
          departureTime: departureTime.toISOString(),
          arrivalTime: arrivalTime.toISOString(),
          train: { name: trainName },
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        router.push(webRoutes.private.SCHEDULE);
      } catch (e) {
        console.error(e);
      } finally {
        toggleLoading();
      }
    })().catch(console.error);
  }, [data, form, router, toggleLoading]);

  return (
    <Wrapper title="Update schedule record">
      <Link href={webRoutes.private.SCHEDULE}>Back to schedule</Link>
      <ScheduleForm
        form={form}
        data={transformedData}
        errorMessage={errorMessage}
        disabled={loading || getScheduleLoading}
      />
      <Button onClick={onClick} disabled={loading || getScheduleLoading}>
        Update
      </Button>
    </Wrapper>
  );
};

export default UpdateSchedule;
