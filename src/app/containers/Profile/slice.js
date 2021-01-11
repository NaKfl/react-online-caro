import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  gameList: {
    data: [],
    status: '',
    error: null,
  },
};
const gameListSlice = createSlice({
  name: 'gameList',
  initialState: initialState,
  reducers: {
    getListGame(state) {
      return flow(
        set('gameList.error', null),
        set('gameList.status', ACTION_STATUS.PENDING),
      )(state);
    },
    getListGameSuccess(state, action) {
      return flow(
        set('gameList.data', action.payload),
        set('gameList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    getListGameFailed(state, action) {
      return flow(
        set('gameList.error', action.payload),
        set('gameList.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = gameListSlice;
