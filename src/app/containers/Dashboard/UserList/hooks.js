import { useCallback } from 'react';
import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';

export const useHooks = () => {
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

  return {
    selectors: {},
    handlers: { showInfoUser },
    states: {},
  };
};

export default useHooks;
