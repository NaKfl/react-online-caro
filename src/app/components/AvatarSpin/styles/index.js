import styled from 'styled-components';
import { Avatar, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { COLOR } from 'styles/colorPalette';

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledAvatar = styled(Avatar)`
  border: solid 3px ${COLOR.WHITE};
  margin-top: 5px;
`;

export const StyledLoadingIcon = styled(LoadingOutlined)`
  font-size: 126px;
  color: ${COLOR.SECONDARY};
`;

export const StyledSpin = styled(Spin)`
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 10;
  color: ${COLOR.WHITE};
  transform: scale(1.05);
`;
