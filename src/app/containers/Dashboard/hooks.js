import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
export const useHooks = () => {
  const [toggleUserList, setToggleUserList] = useState(false);
  const [userListOnline, setUserListOnline] = useState([]);
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.emit('client-get-rooms');
    socket.on('server-send-user-list', ({ listUser }) => {
      const users = listUser.filter(item => item.email !== user.email);
      setUserListOnline(users);
    });
    socket.on('server-send-room-list', ({ listRoom }) => {
      setRoomList(listRoom);
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
      roomList,
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
