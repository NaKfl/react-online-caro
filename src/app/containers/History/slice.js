import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';

export const initialState = {};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
});
export const { actions, reducer, name: sliceKey } = historySlice;
