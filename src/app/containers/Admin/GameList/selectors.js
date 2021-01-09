import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectGameListState = state => state.gameList;

export const makeSelectGameList = createSelector(
  selectGameListState,
  gameList => get('list', gameList),
);
