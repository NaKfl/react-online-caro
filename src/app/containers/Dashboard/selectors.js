import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDashboard = state => state.dashboard;

export const selectOnlineUserList = createSelector(selectDashboard, dashboard =>
  get('onlineUserList', dashboard),
);

export const selectRankList = createSelector(selectDashboard, dashboard =>
  get('rankList', dashboard),
);
