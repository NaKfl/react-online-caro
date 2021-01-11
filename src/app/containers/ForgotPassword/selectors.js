import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

export const selectForgotPassword = state => state.forgotPassword;

export const makeStep = createSelector(selectForgotPassword, step =>
  get('step', step),
);

export const makeStatus = createSelector(selectForgotPassword, status =>
  get('status', status),
);

export const makeStepError = createSelector(selectForgotPassword, stepError =>
  get('stepError', stepError),
);

export const makeRecoverStatus = createSelector(
  selectForgotPassword,
  recoverStatus => get('recoverStatus', recoverStatus),
);
