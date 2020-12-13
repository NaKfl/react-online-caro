import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import { makeSelectRegisterStatus } from './selectors';
import { ACTION_STATUS } from 'utils/constants';

export const useHooks = () => {
  const history = useHistory();
  const { register } = useActions({ register: actions.register }, [actions]);
  const status = useSelector(makeSelectRegisterStatus);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      history.push('/login');
    }
  }, [status, history]);

  const onFinish = useCallback(
    values => {
      delete values.confirm;
      register(values);
    },
    [register],
  );

  return {
    handlers: { onFinish },
    selectors: { status },
  };
};

export default useHooks;
