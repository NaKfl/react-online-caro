import React from 'react';
import {
  StyledContainer,
  StyledAvatar,
  StyledSpin,
  StyledLoadingIcon,
} from './styles';

const AvatarSpin = ({ src, size, isLoading, ...rest }) => {
  const antIcon = <StyledLoadingIcon spin />;
  return (
    <StyledContainer {...rest}>
      <StyledAvatar src={src} size={size} isLoading={isLoading}></StyledAvatar>
      {isLoading && <StyledSpin indicator={antIcon} />}
    </StyledContainer>
  );
};

export default AvatarSpin;
