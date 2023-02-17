'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { webRoutes } from '@/settings';
import { DateFormatsEnum, formatDate } from '@/utils';
import { useDebounce } from '@/hooks';
import { WebRoute } from '@/types';
import { GetSchedulesRequest, useGetSchedules, parseOrder, scheduleService } from '@/api';
import { Table } from '@/components/UI/organisms';
import { Button, Input } from '@/components/UI/atoms';
import { ScheduleFC, ScheduleColumnsType } from './types';
import { Wrapper } from './styles';

const Schedule: ScheduleFC = () => {
  const [debouncedParams, params, setParams] = useDebounce<GetSchedulesRequest>({});
  const { data, loading, refetch } = useGetSchedules(debouncedParams);
  const router = useRouter();

  const columns = useMemo(
    (): ScheduleColumnsType => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
      },
      {
        title: 'Departure',
        dataIndex: 'departure',
        key: 'departure',
        sorter: true,
        responsive: ['sm'],
      },
      {
        title: 'Arrival',
        dataIndex: 'arrival',
        key: 'arrival',
        sorter: true,
        responsive: ['sm'],
      },
      {
        title: 'Departure Time',
        dataIndex: 'departureTime',
        key: 'departureTime',
        render: (value: string) => formatDate(value, DateFormatsEnum.FULL_DATE),
        sorter: true,
        responsive: ['lg'],
      },
      {
        title: 'Arrival Time',
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        render: (value: string) => formatDate(value, DateFormatsEnum.FULL_DATE),
        sorter: true,
        responsive: ['lg'],
      },

      {
        title: 'Train name',
        dataIndex: 'trainName',
        key: 'trainName',
        responsive: ['md'],
      },
      {
        key: 'update',
        render: (_, { id }) => (
          <Button
            disabled={loading}
            onClick={() => router.push(webRoutes.private.SCHEDULE_UPDATE.replace('[id]', String(id)) as WebRoute)}
          >
            Update
          </Button>
        ),
      },
      {
        key: 'delete',
        render: (_, { id }) => (
          <Button
            disabled={loading}
            onClick={() => {
              scheduleService
                .delete(id)
                .then(() => refetch({ params: debouncedParams }))
                .catch(() => {});
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    [debouncedParams, loading, router, refetch],
  );

  const dataSource = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return data.map(({ train, ...schedule }) => ({ ...schedule, trainName: train.name, key: schedule.id }));
  }, [data]);

  return (
    <Wrapper title="Schedule">
      <Button onClick={() => router.push(webRoutes.private.SCHEDULE_CREATE)}>Create new Schedule record</Button>
      <Input
        placeholder="Search..."
        onChange={(e) => {
          setParams((prev) => ({ ...prev, search: e.target.value }));
        }}
        value={params.search}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={(pagination, filters, sorter, extra) => {
          const handlers = {
            sort() {
              if (!Array.isArray(sorter)) {
                setParams((prev) => ({ ...prev, sort: String(sorter.field), order: parseOrder(String(sorter.order)) }));
              }
            },

            paginate() {},
            filter() {},
          };

          handlers[extra.action]();
        }}
      />
    </Wrapper>
  );
};

export default Schedule;
