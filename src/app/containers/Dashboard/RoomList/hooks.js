import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socket';
export const useHooks = props => {
  const history = useHistory();
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [listRoom, setListRoom] = useState(props.listRoom);
  const roomData = props.listRoom;
  const user = getUserFromStorage();
  useEffect(() => {
    if (searchText) {
      let list = roomData.filter(
        room =>
          room.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
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

  const handleCreateRoom = useCallback(
    input => {
      const rooms = roomData.map(room => room.name);
      const nameRoom = rooms.length > 0 ? Math.max(...rooms) + 1 : 1;
      const id = uuidv4();
      const room = {
        id,
        name: nameRoom || 1,
        status: 'AVAILABLE',
      };
      socket.emit('client-create-room', { user: user, room: room });
      history.push(`game/${id}`);
    },
    [roomData],
  );

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
      handleCreateRoom,
    },
    states: {},
  };
};

export default useHooks;
