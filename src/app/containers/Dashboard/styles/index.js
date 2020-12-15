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
  .group-right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 63.75px);
    margin: -25px;
    margin-left: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    .list-user {
      flex: 1;
      padding-bottom: 10px;
    }
  }
`;
export const StyledButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
`;
