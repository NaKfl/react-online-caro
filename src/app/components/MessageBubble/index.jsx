import React from 'react';
import { StyledMessageBubble, StyledInfo } from './styles';

const MessageBubble = ({
  children,
  direction = 'right',
  name,
  time,
  ...rest
}) => {
  return (
    <StyledMessageBubble direction={direction} {...rest}>
      <StyledInfo direction={direction}>{name}</StyledInfo>
      {children}
      <span className="time" direction={direction}>
        {time}
      </span>
    </StyledMessageBubble>
  );
};

export default MessageBubble;
