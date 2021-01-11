import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  error: null,
  status: '',
  step: 0,
  stepError: false,
  recoverStatus: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    fetch(state) {
      return flow(set('status', ''), set('error', null), set('step', 0))(state);
    },
    sendMail(state) {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },

    increaseStep(state, action) {
      return flow(
        set('status', ACTION_STATUS.SUCCESS),
        set('step', action.payload),
      )(state);
    },

    stepError(state) {
      return flow(set('stepError', true), set('status', ''))(state);
    },

    fetchError(state, action) {
      return flow(
        set('stepError', true),
        set('error', action.payload),
        set('status', ''),
      )(state);
    },
    requestRecovery(state) {
      return flow(set('recoverStatus', ACTION_STATUS.PENDING))(state);
    },
    requestRecoverySuccess(state) {
      return flow(set('recoverStatus', ACTION_STATUS.SUCCESS))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = forgotPasswordSlice;
