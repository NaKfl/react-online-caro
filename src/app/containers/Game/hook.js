import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { actions as dashboardActions } from 'app/containers/Dashboard/slice';
import { makeSquarePerRow } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import useActions from 'hooks/useActions';
import queryString from 'query-string';
import socket from 'utils/socket';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';
import { openNotification, notifyError } from 'utils/notify';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { selectOnlineUserList } from 'app/containers/Dashboard/selectors';
import { POPUP_TYPE } from 'app/containers/Popup/constants';

export const useHooks = props => {
  const onlineUserList = useSelector(selectOnlineUserList);
  const { updateOnlineUserList, openPopup } = useActions(
    {
      updateOnlineUserList: dashboardActions.updateOnlineUserList,
      openPopup: popupActions.openPopup,
    },
    [dashboardActions, popupActions],
  );

  const user = getUserFromStorage();
  const squarePerRow = useSelector(makeSquarePerRow);
  const [boards, setBoards] = useState([Array(20 * 20).fill(null)]);
  const room = useParams();
  const history = useHistory();
  const { token } = queryString.parse(props.location.search);
  const [roomPanel, setRoomPanel] = useState({});
  const [status, setStatus] = useState(null);
  const [toggleReady, setToggleReady] = useState(false);
  const isUserInViewingList = roomPanel?.viewingList?.some(
    item => item.id === user.id,
  );

  const handleClickSquare = position => {
    socket.emit('play-chess', position, room);
  };

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.on('server-send-user-list', ({ userList }) => {
      updateOnlineUserList(userList);
    });
  }, [updateOnlineUserList]);

  useEffect(() => {
    socket.on('get-boards', data => {
      setBoards([data]);
    });
    socket.on('get-status', data => {
      setStatus(data);
    });
    return () => {
      socket.off('get-boards');
      socket.off('join-room');
      socket.off('get-status');
    };
  });

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      socket.emit('join-room', { roomId: room.id, user });
    }
  }, [room.id]);

  useEffect(() => {
    const { password } = jwt.verify(token, JWT_SECRET);
    socket.emit('client-update-users-status');
    socket.emit('client-check-pass-room-and-join', {
      password,
      roomId: room.id,
    });
    socket.on(
      'server-check-pass-room-and-join',
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
          history.push(`/`);
        } else {
          if (isCorrect) {
            socket.emit('client-update-users-status');
          } else {
            notifyError('Incorrect password !');
            history.push(`/`);
          }
        }
      },
    );

    socket.on('server-send-join-user', ({ roomPanel }) => {
      console.log('roomPanel', roomPanel);
      setRoomPanel(roomPanel);
    });

    socket.on('server-send-leave-room', ({ roomPanel }) => {
      console.log('roomPanel', roomPanel);
      setRoomPanel(roomPanel);
    });

    socket.on('server-send-leaved-room', () => {
      history.push(`/`);
    });

    return () => {
      socket.off('server-send-join-user');
      socket.off('server-send-leave-room');
    };
  }, [history, room.id, token]);

  useEffect(() => {
    socket.on('server-panel-room-info', ({ roomPanel }) => {
      console.log('roomPanel', roomPanel);
      setRoomPanel(roomPanel);
    });
  }, []);

  const handleLeaveRoom = () => {
    const user = getUserFromStorage();
    if (user) {
      socket.emit('client-leave-room', { user, room: roomPanel });
      socket.emit('client-update-users-status');
    }
    history.push(`/`);
  };

  const handleJoinOutBoard = () => {
    socket.emit('client-user-join-out-board', { roomId: room.id });
  };

  const handleToggleReady = () => {
    setToggleReady(prev => !prev);
    socket.emit('client-user-toggle-ready', { roomId: room.id });
  };

  const handleShowInfo = user => {
    if (user)
      openPopup({
        key: 'showInfoUser',
        type: POPUP_TYPE.INFO_USER,
        user,
      });
  };

  const handleStartGame = roomPanel => {
    if (roomPanel.firstPlayer?.id === user.id)
      socket.emit('client-create-game', { roomPanel });
  };

  const handleConfirmOutRoom = () => {
    openPopup({
      key: 'confirmOutRoom',
      type: POPUP_TYPE.CONFIRM,
      handleConfirm: handleLeaveRoom,
      message: 'Are you sure you leave the room ?',
    });
  };

  return {
    selector: {
      squarePerRow,
      boards,
      status,
      roomPanel,
      user,
      onlineUserList,
      toggleReady,
      isUserInViewingList,
    },
    handlers: {
      handleClickSquare,
      handleLeaveRoom,
      handleJoinOutBoard,
      handleToggleReady,
      handleShowInfo,
      handleStartGame,
      handleConfirmOutRoom,
    },
  };
};
