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
import { selectOnlineUserList } from 'app/containers/Dashboard/selectors';

export const useHooks = props => {
  const onlineUserList = useSelector(selectOnlineUserList);
  const { updateOnlineUserList } = useActions(
    { updateOnlineUserList: dashboardActions.updateOnlineUserList },
    [dashboardActions],
  );

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-connect', { user });
    socket.on('server-send-user-list', ({ userList }) => {
      const users = userList.filter(item => item.email !== user.email);
      updateOnlineUserList(users);
    });
  }, [updateOnlineUserList]);

  const user = getUserFromStorage();
  const squarePerRow = useSelector(makeSquarePerRow);
  const [boards, setBoards] = useState([Array(20 * 20).fill(null)]);
  const room = useParams();
  const history = useHistory();
  const { token } = queryString.parse(props.location.search);
  const [roomPanel, setRoomPanel] = useState({});
  const [status, setStatus] = useState(null);
  const handleClickSquare = position => {
    socket.emit('play-chess', position, room);
  };
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
      socket.emit('client-join-wait-room', { roomId: room.id, user });
      socket.emit('join-room', { roomId: room.id, user });
    }
  }, [room.id]);

  useEffect(() => {
    const { password } = jwt.verify(token, JWT_SECRET);
    socket.emit('client-check-pass-room', { password, roomId: room.id });
    socket.emit('client-check-is-in-room', { roomId: room.id });
    socket.on(
      'server-check-pass-room',
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

  const handleLeaveRoom = () => {
    const user = getUserFromStorage();
    if (user) {
      socket.emit('client-leave-room', { user, room: roomPanel });
      socket.emit('client-update-users-status');
    }
  };
  return {
    selector: { squarePerRow, boards, status, roomPanel, user, onlineUserList },
    handlers: { handleClickSquare, handleLeaveRoom },
  };
};
