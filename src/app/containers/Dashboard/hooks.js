import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectOnlineUserList, selectRankList } from './selectors';

export const useHooks = () => {
  const onlineUserList = useSelector(selectOnlineUserList);
  const rankList = useSelector(selectRankList);
  const { updateOnlineUserList, updateRankList } = useActions(
    {
      updateOnlineUserList: actions.updateOnlineUserList,
      updateRankList: actions.updateRankList,
    },
    [actions],
  );
  const [toggleUserList, setToggleUserList] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.emit('client-get-rooms');
    socket.on('server-send-user-list', ({ userList }) => {
      const users = userList.filter(item => item.email !== user.email);
      updateOnlineUserList(users);
    });
    socket.on('server-send-rank-list', ({ rankList }) => {
      updateRankList(rankList);
    });
    socket.on('server-send-room-list', ({ listRoom }) => {
      setRoomList(listRoom);
    });
  }, [updateOnlineUserList, updateRankList]);

  const handleToggle = useCallback(() => {
    setToggleUserList(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setToggleUserList(false);
  }, []);

  return {
    selectors: {
      onlineUserList,
      roomList,
      rankList,
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
