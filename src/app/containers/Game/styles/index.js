import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
export const StyledLayoutGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const StyledSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  height: ${props => `${props.size}px` || '40px'};
  width: ${props => `${props.size}px` || '40px'};
  cursor: pointer;
`;
export const StyledBoard = styled.div``;
export const StyledGameInfo = styled.div`
  width: 220px;
  border: 1px solid black;
`;
