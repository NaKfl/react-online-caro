import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectInfoUser = state => state.infoUser;

export const selectInfoUserData = createSelector(selectInfoUser, state =>
  get('data', state),
);
