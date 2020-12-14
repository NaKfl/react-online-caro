import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledMessageList = styled.div`
  width: 350px;
  & > * {
    margin-bottom: 10px;
  }
  padding: 10px 20px 5px 20px;
  background-color: white;
  border-radius: 0.4em;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
`;
