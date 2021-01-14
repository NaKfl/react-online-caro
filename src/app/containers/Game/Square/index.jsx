import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ children, onClick, isPosition, ...props }) => {
  return (
    <StyledSquare
      style={{ border: isPosition ? '2px solid rgba(0, 0, 0, 0.6)' : '' }}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledSquare>
  );
});
export default Square;
