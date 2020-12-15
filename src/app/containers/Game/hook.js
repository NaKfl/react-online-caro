import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeSquarePerRow } from './selectors';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import socket from 'utils/socket';

export const useHooks = props => {
  const user = getUserFromStorage();
  console.log('render');
  const squarePerRow = useSelector(makeSquarePerRow);
  const [boards, setBoards] = useState([Array(16 * 16).fill(null)]);
  const query = queryString.parse(props.location.search);

  const handleClickSquare = position => {
    socket.emit('play-chess', position);
    // const temp = [...boards];
    // temp[temp.length - 1][position] = [turn];
    // setBoards(temp);
  };
  useEffect(() => {
    socket.emit('join-room', { ...query, user });
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
