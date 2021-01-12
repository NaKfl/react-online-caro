import React from 'react';
import { StyledMessageBubble, StyledInfo } from './styles';

const MessageBubble = ({
  children,
  direction = 'left',
  name,
  createdAt,
  ...rest
}) => {
  return (
    <StyledMessageBubble direction={direction} {...rest}>
      <StyledInfo direction={direction}>{name}</StyledInfo>
      {children}
      <span className="time" direction={direction}>
        {createdAt}
      </span>
    </StyledMessageBubble>
  );
};

export default MessageBubble;
