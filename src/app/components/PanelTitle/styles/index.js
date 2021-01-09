import styled from 'styled-components';
import { Typography } from 'antd';

export const StyledPanelTitle = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;
    font-size: 18px;
  }
  display: inline-block;
  padding-bottom: 10px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    height: 1px;
    left: -30px;
    right: 0;
    bottom: 0;
    width: auto;
    background: radial-gradient(
      ellipse at left,
      #ddd 0,
      hsla(0, 0%, 100%, 0) 70%
    );
  }
`;
