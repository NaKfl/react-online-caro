import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions as dashboardActions } from 'app/containers/Dashboard/slice';
import { makeSquarePerRow, makeBoardHistory } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
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
  const [boards, setBoards] = useState([Array(16 * 16).fill(null)]);
  const room = useParams();
  const boardHistory = useSelector(makeBoardHistory);
  const [roomPanel, setRoomPanel] = useState({
    host: null,
    guest: null,
    room: null,
  });
  const [status, setStatus] = useState(null);
  const handleClickSquare = position => {
    socket.emit('play-chess', position, room);
    // const temp = [...boards];
    // temp[temp.length - 1][position] = [turn];
    // setBoards(temp);
  };
  socket.emit('join-room', { room: room.id, user });

  useEffect(() => {
    let something = (function () {
      var executed = false;
      return function () {
        if (!executed) {
          executed = true;
          socket.on('get-boads', data => {
            setBoards([data]);
          });
        }
      };
    })();
    something();
    let time;
    clearTimeout(time);
    time = setTimeout(() => {
      socket.on('get-boards', data => {
        setBoards([data]);
      });
      socket.on('get-status', data => {
        setStatus(data);
      });
    }, 200);
    return () => {
      socket.off('get-boards');
      socket.off('join-room');
      socket.off('get-status');
    };
  });
  useEffect(() => {
    const user = getUserFromStorage();
    if (user) socket.emit('client-join-wait-room', { roomId: room.id, user });

    socket.on('server-send-join-user', ({ guestUser, hostUser, room }) => {
      console.log('{ guestUser, hostUser, room }', {
        guestUser,
        hostUser,
        room,
      });
      setRoomPanel(preState => ({ ...preState, host: hostUser, room }));
      if (guestUser.id !== hostUser.id)
        setRoomPanel(preState => ({ ...preState, guest: guestUser, room }));
    });
  }, []);

  return {
    selector: { squarePerRow, boards, status, roomPanel, user },
    handlers: { handleClickSquare },
  };
};
