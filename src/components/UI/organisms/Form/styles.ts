import { size } from '@/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(Form)`
  .error {
    color: #e74c3c;
    height: ${size(16)};
    margin: ${size(16)} 0;
  }
`;
