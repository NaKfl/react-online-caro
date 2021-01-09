import React, { memo } from 'react';
import { StyledPanel, StyledTitle, StyledScrollList } from './styles';

export const Panel = props => {
  const { title, children } = props;
  return (
    <StyledPanel>
      <StyledTitle>{title}</StyledTitle>
      <StyledScrollList>{children}</StyledScrollList>
    </StyledPanel>
  );
};
export default memo(Panel);
