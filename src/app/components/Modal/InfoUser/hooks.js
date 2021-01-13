import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectInfoUserData } from './selectors';
import { actions } from './slice';

export const useHooks = props => {
  const { user } = props;
  const userInfo = useSelector(selectInfoUserData);
  const { fetchInfoUser } = useActions(
    {
      fetchInfoUser: actions.fetchInfoUser,
    },
    [actions],
  );

  useEffect(() => {
    fetchInfoUser(user.id);
  }, [fetchInfoUser, user.id]);

  return {
    handlers: {},
    selectors: { userInfo },
  };
};

export default useHooks;
