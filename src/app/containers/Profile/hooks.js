import { useEffect, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectListGame } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import moment from 'moment';

export const useHooks = () => {
  const { fetchListGameByUser } = useActions(
    { fetchListGameByUser: actions.getListGame },
    [actions],
  );
  const gameListSelector = useSelector(makeSelectListGame);
  const [listGame, setListGame] = useState([]);
  const user = getUserFromStorage();
  user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');

  const convertData = gameList => {
    return gameList.map(item => {
      const isFirstWin = item.userWin === item.infoPlayerFirst.id;
      return {
        roomId: item.roomId,
        roomName: item.room.name,
        playerFirst: item.infoPlayerFirst.name,
        playerSecond: item.infoPlayerSecond.name,
        winner: isFirstWin
          ? item.infoPlayerFirst.name
          : item.infoPlayerSecond.name,
        completeAt: moment(item.createdAt).format('YYYY-MM-DD'),
      };
    });
  };

  useEffect(() => {
    if (gameListSelector && gameListSelector.data) {
      if (gameListSelector.status === ACTION_STATUS.SUCCESS) {
        const games = convertData(gameListSelector.data);
        setListGame(games);
      } else if (gameListSelector.status === ACTION_STATUS.FAILED)
        setListGame([]);
    }
  }, [gameListSelector]);

  useEffect(() => {
    fetchListGameByUser();
  }, [fetchListGameByUser]);

  return {
    states: {
      listGame,
      user,
    },
    handles: {},
    selectors: { gameListSelector },
  };
};
export default useHooks;
