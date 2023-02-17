import { UpdateSchedule } from '@/components/containers';
import { notFound } from 'next/navigation';
import { validateId } from '@/utils';
import { ScheduleUpdatePage } from './types';

const Page: ScheduleUpdatePage = ({ params }) => {
  if (!validateId(params.id)) {
    return notFound();
  }

  return <UpdateSchedule id={+params.id} />;
};

export default Page;
