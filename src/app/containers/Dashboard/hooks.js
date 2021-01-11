import { useState, useCallback, useEffect } from 'react';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { selectOnlineUserList, selectRankList } from './selectors';
import { useHistory } from 'react-router-dom';
import {
  openNotificationInvite,
  openNotification,
  notifyError,
} from 'utils/notify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';

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
  const [roomIdJoin, setRoomIdJoin] = useState('');
  const [isShowModalPass, setShowModalPass] = useState(false);
  const [isMatching, setMatching] = useState(false);
  const [matchingGame, setMatchingGame] = useState({
    status: false,
    roomId: '',
    password: '',
  });
  const history = useHistory();

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.emit('client-get-rooms');
    socket.on('server-send-user-list', ({ userList }) => {
      console.log('aaa', userList);
      updateOnlineUserList(userList);
    });
    socket.on('server-send-rank-list', ({ rankList }) => {
      updateRankList(rankList);
    });
    socket.on('server-send-room-list', ({ listRoom }) => {
      setRoomList(listRoom);
    });
  }, [updateOnlineUserList, updateRankList]);

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

    socket.on('server-send-matching-success', ({ roomId, password }) => {
      setMatchingGame(preState => ({
        ...preState,
        status: true,
        roomId,
        password,
      }));
    });

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

  const findRoomById = (roomList, id) => {
    return roomList.find(room => room.joinId === id);
  };

  const handleEnterInput = event => {
    const roomId = event.target.value;
    const roomJoin = findRoomById(roomList, roomId);
    if (roomJoin) {
      socket.emit('client-check-room-have-pass', {
        roomId: roomJoin.id,
      });
      setRoomIdJoin(roomJoin.id);
    } else {
      notifyError('Not have ROOM ID!');
    }
  };

  const showModalMatching = () => {
    socket.emit('client-send-matching-game');
    socket.emit('client-send-check-matching-game', { rank: '' });
    setMatching(true);
  };

  const handleCancelMatching = () => {
    socket.emit('client-send-cancel-matching-game', {});
    setMatching(false);
  };

  const handlePushToGame = ({ roomId, password }) => {
    const token = jwt.sign({ password }, JWT_SECRET);
    history.push(`/game/${roomId}?token=${token}`);
  };

  return {
    selectors: {
      onlineUserList,
      roomList,
      rankList,
    },
    handlers: {
      handleToggle,
      handleOnClose,
      handleShowModalPass,
      handleCancelPass,
      handleCheckPassword,
      handleJoinRoom,
      handleEnterInput,
      showModalMatching,
      handleCancelMatching,
      handlePushToGame,
    },
    states: {
      toggleUserList,
      isShowModalPass,
      isMatching,
      matchingGame,
    },
  };
};

export default useHooks;
