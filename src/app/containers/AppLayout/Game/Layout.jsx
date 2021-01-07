import { StyledLayout, StyledContent } from './styles';
import { memo } from 'react';
export const GameLayout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};
export default memo(GameLayout);
