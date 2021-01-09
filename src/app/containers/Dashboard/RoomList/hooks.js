import { useState, useCallback, useEffect } from 'react';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socket';

export const useHooks = props => {
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [listRoom, setListRoom] = useState(props.listRoom);
  const [isShowModal, setShowModal] = useState(false);
  // roomId when click join room
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
    const { value } = e.target;
    setFilter(value);
  }, []);

  const handleSearch = useCallback(input => {
    if (typeof input === 'string') setSearchText(input);
    else setSearchText(input.target.value);
  }, []);

  const handleCreateRoom = useCallback(
    valueForm => {
      const rooms = roomData.map(room => room.joinId);
      const joinId = rooms.length > 0 ? Math.max(...rooms) + 1 : 1;
      const id = uuidv4();
      const room = {
        id,
        joinId: joinId,
        name: valueForm.name,
        password: valueForm.password ?? '',
        timePerStep: valueForm.timePerStep,
      };
      socket.emit('client-create-room', { user, room });
    },
    [roomData, user],
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
