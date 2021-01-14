import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  data: {},
  status: '',
  error: null,
};

const infoUserSlice = createSlice({
  name: 'infoUser',
  initialState: initialState,
  reducers: {
    fetchInfoUser(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    fetchInfoUserSuccess(state, action) {
      return flow(
        set('isAuthenticated', true),
        set('data', action.payload),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    fetchInfoUserFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = infoUserSlice;
