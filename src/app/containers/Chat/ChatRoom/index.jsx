import React, { memo } from 'react';
import MessageList from 'app/components/MessageList';
import ChatInput from 'app/components/ChatInput';

import { StyledChat } from '../styles';
import { useHooks } from './hooks';

export const Chat = props => {
  const { height } = props;
  const { states, selectors, handlers } = useHooks(props);
  const { messages } = states;
  const { inputRef, listRef } = selectors;
  const { handleOnPressEnter } = handlers;

  return (
    <StyledChat height={height}>
      <MessageList ref={listRef} className="chat-list" messages={messages} />
      <ChatInput
        ref={inputRef}
        className="chat-input"
        onPressEnter={handleOnPressEnter}
      />
    </StyledChat>
  );
};

export default memo(Chat);
