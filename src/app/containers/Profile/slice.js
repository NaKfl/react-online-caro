import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  gameList: [],
  status: '',
  error: null,
};
const gameListSlice = createSlice({
  name: 'gameList',
  initialState: initialState,
  reducers: {
    getListGame(state) {
      flow(set('error', null), set('status', ACTION_STATUS.PENDING))(state);
    },
    getListGameSuccess(state, action) {
      flow(
        set('gameList', action.payload),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    getListGameFailed(state, action) {
      flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = gameListSlice;
