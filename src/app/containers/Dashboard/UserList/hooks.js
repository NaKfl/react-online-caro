import { useCallback, useEffect } from 'react';
import useActions from 'hooks/useActions';
import { useHistory } from 'react-router-dom';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import socket from 'utils/socket';
import { openNotificationInvite } from 'utils/notify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'configs';

export const useHooks = props => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const history = useHistory();

  useEffect(() => {
    socket.on(
      'server-send-invite-join-room',
      ({ user, inRoom, joinId, password }) => {
        const token = jwt.sign({ password }, JWT_SECRET);
        openNotificationInvite(
          () => history.push(`/game/${inRoom}?token=${token}`),
          joinId,
          user,
        );
      },
    );
  }, []);

  const showInfoUser = useCallback(
    user => {
      openPopup({
        key: 'showInfoUser',
        type: POPUP_TYPE.INFO_USER,
        user,
      });
    },
    [openPopup],
  );

  const handleClickInvite = useCallback(userInvited => {
    console.log(userInvited);
    socket.emit('client-invite-join-room', {
      userInvited,
    });
  }, []);
  return {
    selectors: {},
    handlers: { showInfoUser, handleClickInvite },
    states: {},
  };
};

export default useHooks;
