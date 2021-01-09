import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getListGameByUser } from 'fetchers/service/game.service.js';

function* getListWatcher() {
  yield takeLatest(actions.getListGame, getListTask);
}
function* getListTask() {
  const { response, error } = yield call(getListGameByUserAPI);
  if (response) {
    yield put(actions.getListGameSuccess(response));
  } else {
    yield put(actions.getListGameFalied(error));
  }
}
function getListGameByUserAPI() {
  return getListGameByUser();
}
export default function* defaultSaga() {
  yield all([fork(getListWatcher)]);
}
