import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { makeStatus } from './selectors';
import { useSelector } from 'react-redux';
import { STATUS } from 'utils/constants';
import { useHistory } from 'react-router-dom';

export const useHooks = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [counter, setCounter] = useState(5);
  const status = useSelector(makeStatus);
  const { goVerify } = useActions({ goVerify: actions.goVerify }, [actions]);

  useEffect(() => {
    goVerify(search);
  }, [goVerify, search]);

  useEffect(() => {
    counter > 0 && window.setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      history.push('/');
    }
    return () => {
      window.clearTimeout();
    };
  }, [counter, history]);

  return {
    selectors: {
      status,
      counter,
    },
    handles: {},
  };
};
export default useHooks;
