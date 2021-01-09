import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { v4 as uuidv4 } from 'uuid';
import socket from 'utils/socket';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';
import { openNotification, notifyError } from 'utils/notify';

export const useHooks = props => {
  const history = useHistory();
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [listRoom, setListRoom] = useState(props.listRoom);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowModalPass, setShowModalPass] = useState(false);
  // roomId when click join room
  const [roomIdJoin, setRoomIdJoin] = useState('');
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
    socket.on('server-send-in-room', ({ inRoom, joinId, password }) => {
      console.log({ password });
      const token = jwt.sign({ password }, JWT_SECRET);
      openNotification(
        () => history.push(`/game/${inRoom}?token=${token}`),
        joinId,
      );
    });

    socket.on('server-send-create-room', ({ roomId, password }) => {
      socket.emit('client-update-users-status');
      const token = jwt.sign({ password }, JWT_SECRET);
      history.push(`/game/${roomId}?token=${token}`);
    });

    socket.on(
      'server-check-pass-room-home',
      ({
        isInAnotherRoom,
        isCorrect,
        roomId,
        password,
        inRoom,
        joinId,
        passRoomUserIn,
      }) => {
        if (isInAnotherRoom) {
          const token = jwt.sign({ password: passRoomUserIn }, JWT_SECRET);
          openNotification(
            () => history.push(`/game/${inRoom}?token=${token}`),
            joinId,
          );
        } else {
          if (isCorrect) {
            const token = jwt.sign({ password }, JWT_SECRET);
            history.push(`/game/${roomId}?token=${token}`);
          } else {
            notifyError('Incorrect password !');
          }
        }
      },
    );

    socket.on(
      'server-check-room-have-pass',
      ({
        isInAnotherRoom,
        inRoom,
        joinId,
        passRoomUserIn,
        isHavePass,
        roomId,
        password,
      }) => {
        if (isInAnotherRoom) {
          const token = jwt.sign({ password: passRoomUserIn }, JWT_SECRET);
          console.log(`/game/${inRoom}?token=${token}`);
          openNotification(
            () => history.push(`/game/${inRoom}?token=${token}`),
            joinId,
          );
        } else {
          if (isHavePass) {
            handleShowModalPass();
          } else {
            const token = jwt.sign({ password }, JWT_SECRET);
            history.push(`/game/${roomId}?token=${token}`);
          }
        }
      },
    );
  }, []);

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

  const handleJoinRoom = id => {
    socket.emit('client-check-room-have-pass', {
      roomId: id,
    });
    setRoomIdJoin(id);
  };

  const handleCheckPassword = useCallback(
    ({ password }) => {
      socket.emit('client-check-pass-room-home', {
        password,
        roomId: roomIdJoin,
      });
    },
    [roomIdJoin],
  );

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleShowModalPass = () => {
    setShowModalPass(true);
  };

  const handleCancelPass = () => {
    setShowModalPass(false);
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
      handleShowModalPass,
      handleCancel,
      handleCancelPass,
      handleCheckPassword,
    },
    states: {
      isShowModal,
      isShowModalPass,
    },
  };
};

export default useHooks;
