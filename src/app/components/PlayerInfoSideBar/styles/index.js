import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledPlayerInfoSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
`;

export const StyledPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

export const StyledScore = styled.p`
  margin: 0;
  margin: 6px 0;
  font-size: 3.5em;
  font-weight: bold;
  opacity: 0.8;
`;

export const StyledDivider = styled.div`
  height: 3px;
  width: 150px;
  background: radial-gradient(
    ellipse at center,
    ${COLOR.SECONDARY} 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;
