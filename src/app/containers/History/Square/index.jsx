import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ children, disabled, onClick }) => {
  return (
    <StyledSquare disabled={disabled} onClick={onClick}>
      {children}
    </StyledSquare>
  );
});
export default Square;
