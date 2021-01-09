import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectVerifyState = state => state.verify;

export const makeStatus = createSelector(selectVerifyState, status =>
  get('status', status),
);

export const makeError = createSelector(selectVerifyState, error =>
  get('error', error),
);
