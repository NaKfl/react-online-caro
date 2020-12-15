import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import socket from 'utils/socket';
export const useHooks = props => {
  const history = useHistory();
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [listRoom, setListRoom] = useState([]);
  const roomData = listRoom;
  useEffect(() => {
    socket.emit('get-list-room');
    socket.on('list-room', data => {
      setListRoom(data);
    });
    if (searchText) {
      let list = roomData.filter(
        room =>
          room.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
      );
      setListRoom(list);
    } else setListRoom(roomData);
  }, [searchText, filter, roomData]);

  const handleOnChangeRadio = useCallback(e => {
    console.log({ e });
    const { value } = e.target;
    setFilter(value);
  }, []);

  const handleSearch = useCallback(input => {
    if (typeof input === 'string') setSearchText(input);
    else setSearchText(input.target.value);
  }, []);

  const handleJoinRoom = useCallback(
    id => {
      history.push(`game/${id}`);
    },
    [history],
  );

  return {
    selectors: {
      listRoom,
    },
    handlers: {
      handleOnChangeRadio,
      handleSearch,
      handleJoinRoom,
    },
    states: {},
  };
};

export default useHooks;
