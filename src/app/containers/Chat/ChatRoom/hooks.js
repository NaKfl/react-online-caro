import { useState, useCallback, useEffect, useRef } from 'react';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import socket from 'utils/socket';
import moment from 'moment';

export const useHooks = props => {
  const { roomId, initMessages } = props;
  const user = getUserFromStorage();
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();
  const listRef = useRef();

  const handleOnPressEnter = useCallback(
    e => {
      if (e.target.value)
        socket.emit('client-send-message-room', {
          roomId,
          content: e.target.value,
        });
      inputRef.current.setValue('');
    },
    [roomId],
  );

  useEffect(() => {
    socket.on('server-send-messages-room', ({ messages }) => {
      const list = messages.map(message => {
        return {
          ...message,
          direction: message.userId === user.id ? 'right' : 'left',
          name: message.User?.name ?? 'Anonymous',
          createdAt: moment(message.createdAt).format('LT'),
        };
      });
      setMessages(list);
    });
  }, [roomId, user]);

  useEffect(() => {
    if (listRef) {
      listRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    setMessages(initMessages);
  }, [initMessages]);

  return {
    selectors: { inputRef, listRef },
    handlers: { handleOnPressEnter },
    states: { messages },
  };
};

export default useHooks;
