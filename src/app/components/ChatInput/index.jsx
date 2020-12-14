import React, { forwardRef } from 'react';
import { StyledChatInput, StyledSendIcon } from './styles';

const ChatInput = forwardRef(({ ...rest }, ref) => {
  return (
    <StyledChatInput
      ref={ref}
      suffix={<StyledSendIcon />}
      placeholder="Aa"
      {...rest}
    />
  );
});

export default ChatInput;
