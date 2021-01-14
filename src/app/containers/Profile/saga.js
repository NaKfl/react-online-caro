import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getListGameByUser } from 'fetchers/service/game.service.js';
import { fetchInfoUser } from 'fetchers/service/user.service';

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
function* fetchInfoUserWatcher() {
  yield takeLatest(actions.fetchInfoUser, fetchInfoUserTask);
}

function* fetchInfoUserTask(action) {
  const { response, error } = yield call(fetchInfoUserAPI, action.payload);

  if (response) {
    yield put(actions.fetchInfoUserSuccess(response));
  } else {
    yield put(actions.fetchInfoUserFailed(error.data));
  }
}

function fetchInfoUserAPI(payload) {
  return fetchInfoUser(payload);
}

export default function* defaultSaga() {
  yield all([fork(getListGameWatcher), fork(fetchInfoUserWatcher)]);
}
