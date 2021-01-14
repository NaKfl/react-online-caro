import { useState, useEffect, useCallback } from 'react';
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
import { openNotification, notifyError, notifyInfo } from 'utils/notify';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { selectOnlineUserList } from 'app/containers/Dashboard/selectors';
import { POPUP_TYPE } from 'app/containers/Popup/constants';

export const useHooks = props => {
  const onlineUserList = useSelector(selectOnlineUserList);
  const { updateOnlineUserList, openPopup, closePopup } = useActions(
    {
      updateOnlineUserList: dashboardActions.updateOnlineUserList,
      openPopup: popupActions.openPopup,
      closePopup: popupActions.closePopup,
    },
    [dashboardActions, popupActions],
  );
  const user = getUserFromStorage();
  const squarePerRow = useSelector(makeSquarePerRow);
  const room = useParams();
  const history = useHistory();
  const { token } = queryString.parse(props.location.search);
  const [roomPanel, setRoomPanel] = useState({});
  const [gameInfo, setGameInfo] = useState({
    board: Array(20 * 20).fill(null),
    status: null,
    winArray: [],
  });

  const [toggleReady, setToggleReady] = useState(false);
  const isUserInViewingList = roomPanel?.viewingList?.some(
    item => item?.id === user.id,
  );

  const handleClickSquare = useCallback(position => {
    socket.emit('client-play-chess', { position, roomId: room.id });
  }, []);

  const resetGame = useCallback(() => {
    socket.emit('reset-game', room.id);
  }, []);

  useEffect(() => {
    socket.on(
      'server-send-winner',
      ({ winner, boardData, winArray, turn, currentPosition }) => {
        if (winner) {
          setGameInfo(pre => ({
            ...pre,
            status: `${winner.name} win bruhhh`,
            board: boardData,
            winArray,
            turn,
            currentPosition,
          }));
        }
      },
    );
    socket.on('reset-game', () => {
      setGameInfo(pre => ({
        ...pre,
        board: Array(400).fill(null),
        status: null,
        winArray: [],
      }));
    });

    return () => {
      socket.off('server-send-winner');
      socket.off('reset-game');
    };
  }, []);

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.on('server-send-user-list', ({ userList }) => {
      updateOnlineUserList(userList);
    });
  }, [updateOnlineUserList]);

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
      setRoomPanel(roomPanel);
    });

    socket.on('server-send-leave-room', ({ roomPanel }) => {
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

  const handleAcceptRequestDraw = useCallback(() => {
    socket.emit('client-accept-request-draw', { gameId: gameInfo.id });
  }, [gameInfo]);

  const handleCancelRequestDraw = useCallback(() => {
    socket.emit('client-refuse-request-draw', { gameId: gameInfo.id });
  }, [gameInfo]);

  useEffect(() => {
    socket.on('server-confirm-request-draw', ({ requestedUser }) => {
      openPopup({
        key: 'acceptRequestDraw',
        type: POPUP_TYPE.CONFIRM,
        okText: 'Accept',
        cancelText: 'Refuse',
        handleConfirm: handleAcceptRequestDraw,
        handleCancel: handleCancelRequestDraw,
        message: `${requestedUser.name} request draw. Do you accept ?`,
      });
    });
    return () => {
      socket.off('server-confirm-request-draw');
    };
  }, [gameInfo, handleAcceptRequestDraw, handleCancelRequestDraw, openPopup]);

  useEffect(() => {
    socket.on('server-confirm-refuse-request-draw', ({ answerUser }) => {
      closePopup({
        key: 'requestDraw',
      });
      notifyInfo(`${answerUser.name} refused your request`);
    });
    return () => {
      socket.off('server-confirm-refuse-request-draw');
    };
  }, [closePopup]);

  useEffect(() => {
    socket.on('server-panel-room-info', ({ roomPanel }) => {
      setRoomPanel(roomPanel);
    });

    socket.on('server-game-info', ({ gameInfo }) => {
      if (gameInfo?.status === 'Draw') {
        closePopup({
          key: 'requestDraw',
        });
      }
      setGameInfo(pre => ({ ...pre, ...gameInfo }));
    });
  }, [closePopup]);

  const handleLeaveRoom = () => {
    const user = getUserFromStorage();
    if (user) {
      socket.emit('client-leave-room', { user, room: roomPanel });
      socket.emit('client-update-users-status');
    }
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
    socket.emit('client-create-game', { roomPanel });
  };

  const handleConfirmOutRoom = () => {
    openPopup({
      key: 'confirmOutRoom',
      type: POPUP_TYPE.CONFIRM,
      handleConfirm: handleLeaveRoom,
      message: 'Are you sure to leave the room ?',
    });
  };

  const handleConfirmRequestDraw = () => {
    openPopup({
      key: 'confirmRequestDraw',
      type: POPUP_TYPE.CONFIRM,
      handleConfirm: handleRequestDraw,
      message: 'Are you sure to request draw ?',
    });
  };

  const handleRequestDraw = () => {
    socket.emit('client-request-draw', { gameId: gameInfo.id });
    openPopup({
      key: 'requestDraw',
      type: POPUP_TYPE.CONFIRM,
      message: 'Waiting for rival accept your request',
      loading: true,
    });
  };

  const handleConfirmSurrender = () => {
    openPopup({
      key: 'confirmConfirmSurrender',
      type: POPUP_TYPE.CONFIRM,
      handleConfirm: handleSurrender,
      message: 'Are you sure to surrender ?',
    });
  };

  const handleSurrender = () => {
    // TODO: Xử lý đầu hàng
    socket.emit('client-surrender', { gameId: gameInfo.id });
  };

  const handleUpdateGameInfo = type => {
    const { id } = gameInfo;
    return socket.emit('client-update-game-info', { gameId: id });
  };

  // useEffect(() => {
  //   socket.on('decrease-time', time => {
  //     setGameInfo(pre => ({ ...pre, timeLeft: time }));
  //   });
  //   return () => {

  //     socket.off('decrease-time');
  //   };
  // }, []);
  // useEffect(() => {
  //   socket.on('counter', time => {
  //     setGameInfo(pre => ({ ...pre, timeLeft: time }));
  //     // if (time === 0) {
  //     //   socket.emit('game-over', room.id);
  //     // }
  //   });
  //   socket.on('server-game-over', data => {
  //     console.log('🚀 ~ file: hook.js ~ line 294 ~ useEffect ~ data', data);
  //   });
  //   return () => {
  //     socket.off('counter');
  //     socket.off('game-over');
  //   };
  // }, [room]);
  return {
    selector: {
      squarePerRow,
      roomPanel,
      user,
      onlineUserList,
      toggleReady,
      isUserInViewingList,
      gameInfo,
    },
    handlers: {
      handleClickSquare,
      handleLeaveRoom,
      handleJoinOutBoard,
      handleToggleReady,
      handleShowInfo,
      handleStartGame,
      handleConfirmOutRoom,
      resetGame,
      handleConfirmRequestDraw,
      handleConfirmSurrender,
    },
  };
};
