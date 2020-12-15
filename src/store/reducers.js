import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authenticationReducer } from 'app/containers/Login/slice';
import { reducer as gameReducer } from 'app/containers/Game/slice';
export const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    authentication: authenticationReducer,
    game: gameReducer,
    ...injectedReducers,
  });
};
