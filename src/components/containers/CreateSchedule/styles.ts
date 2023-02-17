import { StandardContainer } from '@/components/UI/organisms';
import { size } from '@/utils';
import styled from 'styled-components';

export const Wrapper = styled(StandardContainer)`
  a {
    display: block;
    margin-bottom: ${size(16)};
  }
`;
