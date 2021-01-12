import { memo } from 'react';
import { StyledSquare } from '../styles';
export const Square = memo(({ children, onClick, ...props }) => {
  return (
    <StyledSquare onClick={onClick} {...props}>
      {children}
    </StyledSquare>
  );
});
export default Square;
