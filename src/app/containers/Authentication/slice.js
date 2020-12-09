import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
export const initialState = {
  isAuthenticated: false,
  info: null,
  status: '',
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    loginSuccess(state, action) {
      return flow(
        set('isAuthenticated', true),
        set('info', action.payload.user),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    loginService(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    loginServiceSuccess(state) {
      return flow(
        set('isAuthenticated', true),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginServiceFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    logout(state) {
      return state;
    },

    logoutSuccess(state) {
      return flow(
        set('isAuthenticated', false),
        set('status', ''),
        set('error', null),
      )(state);
    },

    reset(state) {
      return flow(set('error', null), set('status', ''))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
