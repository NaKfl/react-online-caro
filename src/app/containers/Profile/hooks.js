import { useEffect, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectGameList } from './selectors';
import { ACTION_STATUS } from 'utils/constants';

export const useHooks = () => {
  const { fetchListGameByUser } = useActions(
    { fetchListGameByUser: actions.getListGame },
    [actions],
  );
  const gameListSelector = useSelector(makeSelectGameList);
  const [listGame, setListGame] = useState([]);

  useEffect(() => {
    console.log('gameListSelector', gameListSelector);
    if (gameListSelector && gameListSelector.data) {
      if (gameListSelector.status === ACTION_STATUS.SUCCESS)
        setListGame(gameListSelector.data);
      else if (gameListSelector.status === ACTION_STATUS.FAILED)
        setListGame([]);
    }
  }, [gameListSelector]);

  useEffect(() => {
    fetchListGameByUser();
  }, []);

  return {
    states: {
      listGame,
    },
    handles: {},
    selectors: { gameListSelector },
  };
};
export default useHooks;
