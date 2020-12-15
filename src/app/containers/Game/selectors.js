import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectGameState = state => state.game;
export const makeSquarePerRow = createSelector(selectGameState, game =>
  get('squarePerRow', game),
);
export const makeBoardHistory = createSelector(selectGameState, game =>
  get('boardHistory', game),
);
export const makeXIsNext = createSelector(selectGameState, game =>
  get('xIsNext', game),
);
