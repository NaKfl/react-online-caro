import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS, STATUS } from 'utils/constants';

export const initialState = {
  status: '',
  error: null,
  userList: [],
  updateStatus: '',
  visible: false,
  currentUser: [],
  fetchRate: '',
  currentUserRate: {
    win: 0,
    lose: 0,
  },
};
const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getUserList(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    getListSuccess(state, action) {
      return flow(
        set('userList', action.payload),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    getListFalied(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
    updateRecord(state) {
      return flow(
        set('error', 'null'),
        set('updateStatus', ACTION_STATUS.PENDING),
      )(state);
    },
    updateSuccess(state) {
      return flow(set('updateStatus', ACTION_STATUS.SUCCESS))(state);
    },
    updateFailed(state, action) {
      return flow(
        set('updateStatus', ACTION_STATUS.SUCCESS),
        set('error', action.payload),
      )(state);
    },
    handleOpenModal(state) {
      return flow(set('error', null))(state);
    },
    openModal(state, action) {
      return flow(
        set('currentUser', action.payload),
        set('visible', true),
      )(state);
    },
    closeModal(state) {
      return flow(set('visible', false))(state);
    },
    getRate(state) {
      return flow(set('error', null), set('fetchRate', STATUS.PENDING))(state);
    },
    getRateSuccess(state, action) {
      return flow(
        set('currentUserRate', action.payload),
        set('fetchRate', STATUS.SUCCESS),
      )(state);
    },
    getRateFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('fetchRate', STATUS.FAILED),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = userListSlice;
