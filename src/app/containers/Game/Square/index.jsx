import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ children, size, onClick }) => {
  return (
    <StyledSquare size={size} onClick={onClick}>
      {children}
    </StyledSquare>
  );
});
export default Square;
