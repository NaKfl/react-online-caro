import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  error: null,
  status: '',
  step: 0,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    sendMail(state) {
      flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    sendMailSuccess(state) {
      flow(set('status', ACTION_STATUS.SUCCESS), set('step', 1))(state);
    },
    sendMailFailed(state) {},
  },
});

export const { actions, reducer, name: sliceKey } = forgotPasswordSlice;
