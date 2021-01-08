import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socket';
import { openNotification } from 'utils/notify';

export const useHooks = props => {
  const history = useHistory();
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [listRoom, setListRoom] = useState(props.listRoom);
  const [isShowModal, setShowModal] = useState(false);
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
      console.log('inRoom', inRoom);
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

  const handleCreateRoom = useCallback(
    valueForm => {
      if (!!inRoom) {
        openNotification(() => {}, inRoom);
      } else {
        const rooms = roomData.map(room => room.joinId);
        const joinId = rooms.length > 0 ? Math.max(...rooms) + 1 : 1;
        const id = uuidv4();
        const room = {
          id,
          joinId: joinId,
          name: valueForm.name,
          password: valueForm.password,
          timePerStep: valueForm.timePerStep,
        };
        socket.emit('client-create-room', { user, room });
        history.push(`game/${id}`);
      }
    },
    [history, roomData, user, inRoom],
  );

  const handleJoinRoom = useCallback(
    id => {
      if (!!inRoom) {
        openNotification(() => history.push(`game/${inRoom}`), inRoom);
      } else history.push(`game/${id}`);
    },
    [history, inRoom],
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return {
    selectors: {
      listRoom,
    },
    handlers: {
      handleOnChangeRadio,
      handleSearch,
      handleJoinRoom,
      handleCreateRoom,
      handleShowModal,
      handleCancel,
    },
    states: {
      isShowModal,
    },
  };
};

export default useHooks;
