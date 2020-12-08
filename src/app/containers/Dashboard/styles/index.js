import styled from 'styled-components';
import { Button } from 'antd';
export const StyledDashboard = styled.div`
  .list {
    & > * {
      width: 50%;
    }
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;
export const StyledButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
`;
