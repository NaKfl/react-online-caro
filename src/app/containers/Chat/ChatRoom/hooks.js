import { useState, useCallback, useEffect, useRef } from 'react';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import socket from 'utils/socket';

export const useHooks = props => {
  const { roomId } = props;
  const user = getUserFromStorage();
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();
  const listRef = useRef();

  const handleOnPressEnter = useCallback(
    e => {
      if (e.target.value)
        socket.emit('client-send-message-room', {
          roomId,
          message: e.target.value,
        });
      inputRef.current.setValue('');
    },
    [roomId],
  );

  useEffect(() => {
    socket.emit('client-join-room', { roomId, user });
    socket.on('server-send-messages-room', ({ messages }) => {
      const list = messages.map(message => {
        message.direction = message.userId === user.id ? 'right' : 'left';
        return message;
      });
      setMessages(list);
    });
  }, [roomId, user.id]);

  useEffect(() => {
    if (listRef) {
      listRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return {
    selectors: { inputRef, listRef },
    handlers: { handleOnPressEnter },
    states: { messages },
  };
};

export default useHooks;
