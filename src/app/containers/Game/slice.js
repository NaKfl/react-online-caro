import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
export const initialState = {
  squarePerRow: 16,
  turn: null,
  loading: true,
  winner: null,
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    loadingDone(state) {
      return flow(set('loading', false))(state);
    },
    setTurn(state, action) {
      return flow(set('turn', action.payload))(state);
    },
    setWinner(state, action) {
      return flow(set('winner', action.payload))(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = gameSlice;
