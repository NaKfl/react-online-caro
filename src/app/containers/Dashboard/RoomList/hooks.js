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
  const [inRoom, setInRoom] = useState('');
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

  useEffect(() => {
    socket.on('server-send-in-room', ({ inRoom }) => {
      console.log('In Room :', inRoom);
      // Event Block Join Room
      setInRoom(inRoom);
    });
  }, []);

  const handleOnChangeRadio = useCallback(e => {
    console.log({ e });
    const { value } = e.target;
    setFilter(value);
  }, []);

  const handleSearch = useCallback(input => {
    if (typeof input === 'string') setSearchText(input);
    else setSearchText(input.target.value);
  }, []);

  const handleCreateRoom = useCallback(() => {
    const rooms = roomData.map(room => room.joinId);
    const joinId = rooms.length > 0 ? Math.max(...rooms) + 1 : 1;
    const id = uuidv4();
    const room = {
      id,
      joinId: joinId,
      name: 'Default Name',
    };
    socket.emit('client-create-room', { user, room });
    history.push(`game/${id}`);
  }, [history, roomData, user]);

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
