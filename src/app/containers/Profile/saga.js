import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getListGameByUser } from 'fetchers/service/game.service.js';

function* getListGameWatcher() {
  yield takeLatest(actions.getListGame, getListTask);
}
function* getListTask() {
  const { response, error } = yield call(getListGameAPI);
  if (response) {
    yield put(actions.getListGameSuccess(response));
  } else {
    yield put(actions.getListGameFailed(error));
  }
}
function getListGameAPI() {
  return getListGameByUser();
}
export default function* defaultSaga() {
  yield all([fork(getListGameWatcher)]);
}
