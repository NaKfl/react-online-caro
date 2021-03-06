import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  list: [],
  status: '',
  error: null,
};
const gameListSlice = createSlice({
  name: 'gameList',
  initialState: initialState,
  reducers: {
    getList(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    getListSuccess(state, action) {
      return flow(
        set('list', action.payload),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    getListFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = gameListSlice;
