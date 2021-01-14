import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { fetchInfoUser } from 'fetchers/service/user.service';

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
  yield all([fork(fetchInfoUserWatcher)]);
}
