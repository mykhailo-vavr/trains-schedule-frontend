'use client';

import { useRouter } from 'next/navigation';
import { useForm, useToggle } from '@/hooks';
import { Button, Link } from '@/components/UI/atoms';
import { useCallback, useState } from 'react';
import { webRoutes } from '@/settings';
import { scheduleService } from '@/api';
import { ScheduleForm } from '@/components/UI/organisms';
import { CreateScheduleFC, CreateScheduleForm } from './types';
import { Wrapper } from './styles';

const CreateSchedule: CreateScheduleFC = () => {
  const [form] = useForm<CreateScheduleForm>();
  const [loading, toggleLoading] = useToggle();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onClick = useCallback(() => {
    (async () => {
      try {
        toggleLoading();

        await form.validateFields();

        const { dates, trainName, ...schedule } = form.getFieldsValue();
        const [departureTime, arrivalTime] = dates;

        const { error } = await scheduleService.create({
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
  }, [form, toggleLoading]);

  return (
    <Wrapper title="Create schedule record">
      <Link href={webRoutes.private.SCHEDULE}>Back to schedule</Link>
      <ScheduleForm form={form} errorMessage={errorMessage} disabled={loading} />
      <Button onClick={onClick} disabled={loading}>
        Create
      </Button>
    </Wrapper>
  );
};

export default CreateSchedule;
