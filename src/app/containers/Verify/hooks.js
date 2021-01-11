import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { makeStatus, makeExpired } from './selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser } from 'utils/localStorageUtils';

export const useHooks = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [counter, setCounter] = useState(5);
  const status = useSelector(makeStatus);
  const expired = useSelector(makeExpired);
  const { goVerify } = useActions({ goVerify: actions.goVerify }, [actions]);
  const user = getUser();
  useEffect(() => {
    if (user || !search) {
      history.push('/');
    } else {
      goVerify(search);
    }
  }, [goVerify, search, user, history]);

  useEffect(() => {
    !expired &&
      counter > 0 &&
      window.setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      history.push('/');
    }
    return () => {
      window.clearTimeout();
    };
  }, [counter, history, expired]);

  const goToHome = () => {
    history.push('/');
  };
  const goToLogin = () => {
    history.push('/login');
  };
  return {
    selectors: {
      status,
      counter,
      expired,
    },
    handles: {
      goToHome,
      goToLogin,
    },
  };
};
export default useHooks;
