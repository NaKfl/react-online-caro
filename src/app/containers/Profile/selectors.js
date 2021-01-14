import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectListGameState = state => state.gameList;

export const makeSelectListGame = createSelector(
  selectListGameState,
  gameList => get('gameList', gameList),
);

export const selectInfoUser = createSelector(selectListGameState, gameList =>
  get('gameList.info', gameList),
);
