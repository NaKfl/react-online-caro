import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ turn, size }) => {
  const Content = () => {
    if (turn === 'x') return 'X';
    else if (turn === 'o') return 'Y';
    else return '';
  };
  return <StyledSquare size={size}>{Content()}</StyledSquare>;
});
export default Square;
