import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authenticationReducer } from 'app/containers/Login/slice';
import { reducer as dashboardReducer } from 'app/containers/Dashboard/slice';
export const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    authentication: authenticationReducer,
    dashboard: dashboardReducer,
    ...injectedReducers,
  });
};
