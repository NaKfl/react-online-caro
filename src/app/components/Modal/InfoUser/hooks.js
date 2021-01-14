import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectInfoUserData } from './selectors';
import { actions } from './slice';

export const useHooks = props => {
  const { user } = props;
  const userInfo = useSelector(selectInfoUserData);
  const { fetchInfoUser, resetState } = useActions(
    {
      fetchInfoUser: actions.fetchInfoUser,
      resetState: actions.resetState,
    },
    [actions],
  );

  useEffect(() => {
    fetchInfoUser(user.id);
  }, [fetchInfoUser, user.id]);

  useEffect(() => {
    return () => resetState();
  }, [resetState]);

  return {
    handlers: {},
    selectors: { userInfo },
  };
};

export default useHooks;
