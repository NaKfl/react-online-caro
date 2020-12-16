import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSquarePerRow } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { useParams } from 'react-router-dom';
import socket from 'utils/socket';

export const useHooks = props => {
  const user = getUserFromStorage();
  console.log('render');
  const squarePerRow = useSelector(makeSquarePerRow);
  const [boards, setBoards] = useState([Array(16 * 16).fill(null)]);
  const room = useParams();

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
  return {
    selector: { squarePerRow, boards },
    handlers: { handleClickSquare },
  };
};
