import { StandardContainer } from '@/components/UI/organisms';
import { size } from '@/utils';
import styled from 'styled-components';

export const Wrapper = styled(StandardContainer)`
  input {
    margin: ${size(20)} 0 ${size(4)};
  }
`;
