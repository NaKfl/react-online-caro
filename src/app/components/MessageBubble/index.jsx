import React from 'react';
import { StyledMessageBubble, StyledTime } from './styles';

const MessageBubble = ({ children, direction = 'right', time, ...rest }) => {
  return (
    <StyledMessageBubble direction={direction} {...rest}>
      {children}
      <StyledTime className="time" direction={direction}>
        {time}
      </StyledTime>
    </StyledMessageBubble>
  );
};

export default MessageBubble;
