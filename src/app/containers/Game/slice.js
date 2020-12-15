import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import concat from 'lodash/concat';
import { ACTION_STATUS } from 'utils/constants';
export const initialState = {
  squarePerRow: 16,
  boardHistory: [Array(256).fill(null)],
  xIsNext: true,
};
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    chessAtPosition(state, action) {
      const temp = concat(state.boardHistory);
      const content = state.xIsNext === 1 ? 'X' : 'O';
      return flow(
        set(`temp[${action.payload.position}]`, content),
        state.boardHistory.push(temp),
      )(state);
    },
  },
});
export const { actions, reducer, name: sliceKey } = gameSlice;
