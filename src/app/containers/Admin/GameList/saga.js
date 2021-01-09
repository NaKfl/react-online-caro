import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getList } from 'fetchers/service/game.service.js';

function* getListGameWatcher() {
  yield takeLatest(actions.getList, getListTask);
}
function* getListTask() {
  const { response, error } = yield call(getListGameAPI);
  if (response) {
    yield put(actions.getListSuccess(response));
  } else {
    yield put(actions.getListFailed(error));
  }
}
function getListGameAPI() {
  return getList();
}
export default function* defaultSaga() {
  yield all([fork(getListGameWatcher)]);
}
