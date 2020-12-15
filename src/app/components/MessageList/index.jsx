import React, { memo, forwardRef } from 'react';
import MessageBubble from 'app/components/MessageBubble';
import { StyledMessageList } from './styles';

export const MessageList = forwardRef((props, ref) => {
  const { messages, ...rest } = props;
  return (
    <StyledMessageList ref={ref} {...rest}>
      {messages &&
        messages.map(({ content, ...properties }, index) => (
          <MessageBubble key={index} {...properties}>
            {content}
          </MessageBubble>
        ))}
    </StyledMessageList>
  );
});
export default memo(MessageList);
