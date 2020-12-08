import { useState, useEffect, useCallback } from 'react';
import socket from 'config/socket';
export const useHooks = () => {
  const [toggleUserList, setToggleUserList] = useState(false);
  const [userListOnline, setUserListOnline] = useState([]);
  useEffect(() => {
    socket.on('onlineUser', res => {
      setUserListOnline(res);
    });
  });
  const handleToggle = useCallback(() => {
    setToggleUserList(true);
    const user = {
      email: 'test@gmail.com',
      userName: 'thaianh',
    };
    socket.emit('client-login', { user });
  }, []);

  const handleOnClose = useCallback(() => {
    setToggleUserList(false);
  }, []);

  return {
    selectors: {
      userListOnline,
    },
    handlers: {
      handleToggle,
      handleOnClose,
    },
    states: {
      toggleUserList,
    },
  };
};

export default useHooks;
