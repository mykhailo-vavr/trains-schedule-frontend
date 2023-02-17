'use client';

import { useUser } from '@/hooks';
import { Descriptions } from '@/components/UI/molecules';
import { DescriptionsItem } from '@/components/UI/atoms';
import { DateFormatsEnum, formatDate } from '@/utils';
import { ProfileFC } from './types';
import { Wrapper } from './styles';

const Profile: ProfileFC = () => {
  const user = useUser();

  return (
    <Wrapper>
      <Descriptions title="Profile info" layout="vertical">
        <DescriptionsItem label="Username">{user.username}</DescriptionsItem>
        <DescriptionsItem label="Created at">{formatDate(user.createdAt, DateFormatsEnum.FULL_DATE)}</DescriptionsItem>
      </Descriptions>
    </Wrapper>
  );
};

export default Profile;
