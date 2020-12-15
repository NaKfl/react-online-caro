import styled from 'styled-components';
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
  justify-content: space-between;
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
export const StyledBoard = styled.div`
  border-radius: 8px;
  transition: all 0.15s ease;
  backdrop-filter: blur(10px);
  background-color: #f8f8f8;
  box-shadow: #727272 0 0 15px;
  padding: 8px;
`;
export const StyledGameInfo = styled.div`
  width: 220px;
`;
