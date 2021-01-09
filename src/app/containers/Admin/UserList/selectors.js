import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectUserListState = state => state.userList;

export const makeSelectUserList = createSelector(
  selectUserListState,
  userList => get('userList', userList),
);
export const makeVisible = createSelector(selectUserListState, visible =>
  get('visible', visible),
);
export const makeCurrentUser = createSelector(
  selectUserListState,
  currentUser => get('currentUser', currentUser),
);
export const makeRate = createSelector(selectUserListState, currentUserRate =>
  get('currentUserRate', currentUserRate),
);
