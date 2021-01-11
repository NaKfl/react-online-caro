import styled from 'styled-components';
import { Typography } from 'antd';
const { Title } = Typography;

export const StyledLayout = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px;
  background-color: white;
  max-width: 400px;
  .form {
    width: 300px;
  }
`;
export const StyledTitle = styled(Title)`
  margin-bottom: 10px;
`;
