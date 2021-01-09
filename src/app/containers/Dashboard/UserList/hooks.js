import { useCallback } from 'react';
import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import socket from 'utils/socket';

export const useHooks = props => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

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
