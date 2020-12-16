import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSquarePerRow, makeBoardHistory } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import socket from 'utils/socket';

export const useHooks = props => {
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

  const handleClickSquare = position => {
    socket.emit('play-chess', position, user);
    // const temp = [...boards];
    // temp[temp.length - 1][position] = [turn];
    // setBoards(temp);
  };
  socket.emit('join-room', { room: room.id, user });
  useEffect(() => {
    let time;
    clearTimeout(time);
    time = setTimeout(() => {
      socket.on('get-boards', data => {
        setBoards([data]);
      });
    }, 150);
    return () => {
      socket.off('get-boards');
      socket.off('join-room');
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
    selector: { squarePerRow, boards, user, roomPanel },
    handlers: { handleClickSquare },
  };
};
