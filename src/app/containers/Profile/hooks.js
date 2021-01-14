import { useEffect, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { makeSelectListGame, selectInfoUser } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import moment from 'moment';

export const useHooks = () => {
  const { fetchInfoUser, fetchListGameByUser } = useActions(
    {
      fetchListGameByUser: actions.getListGame,
      fetchInfoUser: actions.fetchInfoUser,
    },
    [actions],
  );
  const gameListSelector = useSelector(makeSelectListGame);
  const userInfo = useSelector(selectInfoUser);
  const [listGame, setListGame] = useState([]);
  const user = getUserFromStorage();
  user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');

  const convertData = gameList => {
    return gameList.map(item => {
      const isFirstWin = item?.userWin === item?.infoPlayerFirst.id;
      return {
        _roomId: item?.roomId,
        _roomName: item?.room.name,
        _playerFirst: item?.infoPlayerFirst.name,
        _playerSecond: item?.infoPlayerSecond.name,
        _winner: isFirstWin
          ? item?.infoPlayerFirst.name
          : item?.infoPlayerSecond.name,
        _completeAt: moment(item?.createdAt).format('YYYY-MM-DD'),
        ...item,
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

  useEffect(() => {
    fetchInfoUser(user.id);
  }, [fetchInfoUser, user.id]);

  return {
    states: {
      listGame,
      user,
    },
    handles: {},
    selectors: { gameListSelector, userInfo },
  };
};
export default useHooks;
