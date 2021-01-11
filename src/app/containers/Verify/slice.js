import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  status: ACTION_STATUS.PENDING,
  error: null,
  expired: false,
};

const verifySlice = createSlice({
  name: 'verify',
  initialState: initialState,
  reducers: {
    goVerify(state) {
      return flow(
        set('status', ACTION_STATUS.PENDING),
        set('error', null),
      )(state);
    },
    verifySuccess(state) {
      return flow(set('status', ACTION_STATUS.SUCCESS))(state);
    },
    verifyFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
    expiredToken(state, action) {
      return flow(
        set('expired', true),
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = verifySlice;
