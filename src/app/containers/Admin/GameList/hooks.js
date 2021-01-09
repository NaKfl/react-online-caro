import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectGameList } from './selectors';
export const useHooks = () => {
  const { getList } = useActions({ getList: actions.getList }, [actions]);
  const gameList = useSelector(makeSelectGameList);
  useEffect(() => {
    getList();
  }, [getList]);
  return {
    handles: {},
    selectors: { gameList },
  };
};
export default useHooks;
