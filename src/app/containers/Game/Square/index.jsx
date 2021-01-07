import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ children, onClick }) => {
  return <StyledSquare onClick={onClick}>{children}</StyledSquare>;
});
export default Square;
