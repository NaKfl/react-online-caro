import { useState, useCallback } from 'react';
import socket from 'utils/socket';
export const useHooks = () => {
  const [toggleUserList, setToggleUserList] = useState(false);
  const [userListOnline, setUserListOnline] = useState([]);

  socket.on('onlineUser', res => {
    setUserListOnline(res);
  });

  const handleToggle = useCallback(() => {
    setToggleUserList(true);
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
