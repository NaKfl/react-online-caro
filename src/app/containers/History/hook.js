import { selectOnlineUserList } from 'app/containers/Dashboard/selectors';
import { actions as dashboardActions } from 'app/containers/Dashboard/slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import get from 'lodash/fp/get';
import socket from 'utils/socket';
import moment from 'moment';

export const useHooks = props => {
  const user = getUserFromStorage();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onlineUserList = useSelector(selectOnlineUserList);
  const { openPopup } = useActions(
    {
      openPopup: popupActions.openPopup,
    },
    [dashboardActions, popupActions],
  );

  const history = useHistory();
  const [roomPanel, setRoomPanel] = useState({});
  const [gameInfo, setGameInfo] = useState({});

  const messages = get('room.message', gameInfo);
  const formattedMessages = messages?.map(item => ({
    ...item,
    name: item.User?.name ?? 'Anonymous',
    createdAt: moment(item.createdAt).format('LT'),
  }));

  const steps = get('step', gameInfo);
  const boards = steps?.map(step => get('board', step));
  const formattedBoards =
    boards?.map(board =>
      board?.split(', ')?.map(char => (char ? char : null)),
    ) ?? [];

  useEffect(() => {
    if (user) socket.emit('client-connect', { user });
  }, [user]);

  useEffect(() => {
    socket.emit('client-get-history', { gameId: id });
  }, [id]);

  useEffect(() => {
    socket.on('server-panel-room-info', ({ roomPanel }) => {
      setRoomPanel(roomPanel);
    });

    socket.on('server-send-game-history', ({ gameInfo }) => {
      setGameInfo(gameInfo);
    });
  }, []);

  const handleLeaveRoom = () => {
    history.push(`/`);
  };

  const handleShowInfo = user => {
    if (user)
      openPopup({
        key: 'showInfoUser',
        type: POPUP_TYPE.INFO_USER,
        user,
      });
  };

  const handleBackwardStep = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleForwardStep = () => {
    setCurrentIndex(prev =>
      prev + 1 <= formattedBoards.length - 1 ? prev + 1 : prev,
    );
  };

  return {
    selector: {
      roomPanel,
      onlineUserList,
      gameInfo,
      currentIndex,
      boards: formattedBoards,
      messages: formattedMessages,
    },
    handlers: {
      handleLeaveRoom,
      handleShowInfo,
      handleForwardStep,
      handleBackwardStep,
    },
  };
};
