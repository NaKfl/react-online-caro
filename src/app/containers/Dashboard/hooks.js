import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getAuthInfo } from 'utils/localStorageUtils';
export const useHooks = () => {
  const [toggleUserList, setToggleUserList] = useState(false);
  const [userListOnline, setUserListOnline] = useState([]);

  useEffect(() => {
    const userInfo = getAuthInfo()?.user;
    socket.on('onlineUser', res => {
      const listUser = res.filter(user => user.email !== userInfo.email);
      const removeDuplicate = listUser.reduce((acc, curr) => {
        if (!acc.find(item => item.email === curr.email)) acc.push(curr);
        return acc;
      }, []);
      setUserListOnline(removeDuplicate);
    });
    if (userInfo) {
      socket.emit('client-login', { user: userInfo });
    }
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
