import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { actions as dashboardActions } from 'app/containers/Dashboard/slice';
import { makeSquarePerRow } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import useActions from 'hooks/useActions';
import socket from 'utils/socket';

export const useHooks = props => {
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
  console.log('render');
  const [roomPanel, setRoomPanel] = useState({
    host: null,
    guest: null,
    room: null,
  });
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
    socket.on('server-send-join-user', ({ guestUser, hostUser, room }) => {
      setRoomPanel(preState => ({ ...preState, host: hostUser, room }));
      if (guestUser.id !== hostUser.id)
        setRoomPanel(preState => ({ ...preState, guest: guestUser, room }));
    });
    return () => {
      socket.off('server-send-join-user');
    };
  }, []);

  return {
    selector: { squarePerRow, boards, status, roomPanel, user },
    handlers: { handleClickSquare },
  };
};
