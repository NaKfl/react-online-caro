import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import Title from 'app/components/Title';

export const StyledUserList = styled.div`
  background-color: transparent;
  padding: 15px 0 15px 0;
  height: 100%;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.4em;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
`;

export const StyledTitle = styled(Title)`
  margin-left: 20px;
`;

export const StyledScrollList = styled.div`
  max-height: 480px;
  overflow-y: auto;
`;
