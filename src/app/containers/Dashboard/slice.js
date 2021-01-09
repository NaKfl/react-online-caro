import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';

export const initialState = {
  onlineUserList: [],
  rankList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateOnlineUserList(state, action) {
      return set('onlineUserList', action.payload)(state);
    },

    updateRankList(state, action) {
      return set('rankList', action.payload)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = dashboardSlice;
