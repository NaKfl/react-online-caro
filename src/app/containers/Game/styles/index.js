import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
const SizeOfSquare = ({ size }) => {
  if (typeof size === 'undefined') return `20px`;
  if (size === 'null') return `20px`;
  const height = size.height / 22;
  const width = ((size.width / 22) * 2) / 3;
  const result = height < width ? `${height}px` : `${width}px`;
  return result;
};

export const StyledLayoutGame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const StyledSquare = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
  font-family: 'Fredoka One', cursive !important;
  font-weight: 500;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  /* border: 1px solid rgba(0, 0, 0, 0.45); */
  box-shadow: #0c0c0c 0 0 4px;
  color: ${({ children }) => (children === 'x' ? 'red' : 'blue')};
  height: ${props => SizeOfSquare(props)};
  width: ${props => SizeOfSquare(props)};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
  &:hover {
    transform: scale(0.95);
    border: 1.5px solid rgba(0, 0, 0, 0.8);
  }
`;
export const StyledNotifiWinner = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  height: 200px;
  width: 400px;
  background-color: #f8f8f8;
  box-shadow: #727272 0 0 15px;
  resize: both;
  border: 10px solid black;
  border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E")
    1;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const StyledBoard = styled.div`
  border-radius: 8px;
  transition: all 0.15s ease;
  backdrop-filter: blur(10px);
  background-color: #f8f8f8;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
  padding: 8px;
  position: relative;
`;
export const StyledGameInfo = styled.div`
  width: 220px;
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 30px;
`;

export const StyledSideRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > * {
    width: 80%;
  }
`;
export const StyledSideLeft = styled.div`
  display: flex;
  justify-content: flex-end;
`;