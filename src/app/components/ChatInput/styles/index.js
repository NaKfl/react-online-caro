import styled from 'styled-components';
import Input from 'app/components/Input';
import { SendOutlined } from '@ant-design/icons';
import { COLOR } from 'styles/colorPalette';

export const StyledChatInput = styled(Input)`
  border: none;
  border-radius: 0.4em;
  padding: 10px;
  height: 40px;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
`;

export const StyledSendIcon = styled(SendOutlined)`
  opacity: 0.6;
`;
