import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
export const useHooks = () => {
  const [toggleUserList, setToggleUserList] = useState(false);
  const [userListOnline, setUserListOnline] = useState([]);

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });

    socket.on('server-send-user-list', ({ listUser }) => {
      const users = listUser.filter(item => item.email !== user.email);
      setUserListOnline(users);
    });
  }, []);

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
