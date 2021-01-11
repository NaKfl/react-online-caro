import React from 'react';
import { StyledTitle, StyledGameButton, StyledButton } from './styles';

const GameButton = ({
  title,
  buttonColor,
  titleColor,
  icon,
  disabled,
  ...rest
}) => {
  return (
    <StyledGameButton disabled={disabled} {...rest}>
      <StyledButton color={buttonColor} icon={icon} />
      <StyledTitle color={titleColor}>{title}</StyledTitle>
    </StyledGameButton>
  );
};

export default GameButton;
