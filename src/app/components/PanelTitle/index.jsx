import React from 'react';
import { StyledPanelTitle } from './styles';

const PanelTitle = ({ children, ...rest }) => {
  return (
    <StyledPanelTitle level={5} {...rest}>
      {children}
    </StyledPanelTitle>
  );
};

export default PanelTitle;
