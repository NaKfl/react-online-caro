import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import { selectOnlineUserList } from './selectors';
import {
  openNotificationInvite,
  openNotification,
  notifyError,
} from 'utils/notify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';

export const useHooks = () => {
  const onlineUserList = useSelector(selectOnlineUserList);
  const { updateOnlineUserList } = useActions(
    { updateOnlineUserList: actions.updateOnlineUserList },
    [actions],
  );
  const [toggleUserList, setToggleUserList] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [roomIdJoin, setRoomIdJoin] = useState('');
  const [isShowModalPass, setShowModalPass] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.emit('client-get-rooms');
    socket.on('server-send-user-list', ({ userList }) => {
      const users = userList.filter(item => item.email !== user.email);
      updateOnlineUserList(users);
    });
    socket.on('server-send-room-list', ({ listRoom }) => {
      setRoomList(listRoom);
    });

    return () => {
      socket.off('server-send-room-list');
      socket.off('server-send-user-list');
    };
  }, [updateOnlineUserList]);

  useEffect(() => {
    socket.on(
      'server-send-invite-join-room',
      ({ user, inRoom, joinId, password }) => {
        const token = jwt.sign({ password }, JWT_SECRET);
        openNotificationInvite(
          () => history.push(`/game/${inRoom}?token=${token}`),
          joinId,
          user,
        );
      },
    );

    socket.on('server-send-in-room', ({ inRoom, joinId, password }) => {
      console.log({ password });
      const token = jwt.sign({ password }, JWT_SECRET);
      openNotification(
        () => history.push(`/game/${inRoom}?token=${token}`),
        joinId,
      );
    });

    socket.on('server-send-create-room', ({ roomId, password }) => {
      socket.emit('client-update-users-status');
      const token = jwt.sign({ password }, JWT_SECRET);
      history.push(`/game/${roomId}?token=${token}`);
    });

    socket.on(
      'server-check-pass-room-home',
      ({
        isInAnotherRoom,
        isCorrect,
        roomId,
        password,
        inRoom,
        joinId,
        passRoomUserIn,
      }) => {
        if (isInAnotherRoom) {
          const token = jwt.sign({ password: passRoomUserIn }, JWT_SECRET);
          openNotification(
            () => history.push(`/game/${inRoom}?token=${token}`),
            joinId,
          );
        } else {
          if (isCorrect) {
            const token = jwt.sign({ password }, JWT_SECRET);
            history.push(`/game/${roomId}?token=${token}`);
          } else {
            notifyError('Incorrect password !');
          }
        }
      },
    );

    socket.on(
      'server-check-room-have-pass',
      ({
        isInAnotherRoom,
        inRoom,
        joinId,
        passRoomUserIn,
        isHavePass,
        roomId,
        password,
      }) => {
        if (isInAnotherRoom) {
          const token = jwt.sign({ password: passRoomUserIn }, JWT_SECRET);
          console.log(`/game/${inRoom}?token=${token}`);
          openNotification(
            () => history.push(`/game/${inRoom}?token=${token}`),
            joinId,
          );
        } else {
          if (isHavePass) {
            handleShowModalPass();
          } else {
            const token = jwt.sign({ password }, JWT_SECRET);
            history.push(`/game/${roomId}?token=${token}`);
          }
        }
      },
    );

    return () => {
      socket.off('server-send-invite-join-room');
      socket.off('server-send-in-room');
      socket.off('server-send-create-room');
      socket.off('server-check-pass-room-home');
    };
  }, []);

  const handleToggle = useCallback(() => {
    setToggleUserList(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setToggleUserList(false);
  }, []);

  const handleCheckPassword = useCallback(
    ({ password }) => {
      socket.emit('client-check-pass-room-home', {
        password,
        roomId: roomIdJoin,
      });
    },
    [roomIdJoin],
  );

  const handleJoinRoom = id => {
    socket.emit('client-check-room-have-pass', {
      roomId: id,
    });
    setRoomIdJoin(id);
  };

  const handleShowModalPass = () => {
    setShowModalPass(true);
  };

  const handleCancelPass = () => {
    setShowModalPass(false);
  };

  return {
    selectors: {
      onlineUserList,
      roomList,
    },
    handlers: {
      handleToggle,
      handleOnClose,
      handleShowModalPass,
      handleCancelPass,
      handleCheckPassword,
      handleJoinRoom,
    },
    states: {
      toggleUserList,
      isShowModalPass,
    },
  };
};

export default useHooks;
