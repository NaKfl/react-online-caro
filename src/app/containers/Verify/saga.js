import { register } from 'fetchers/authFetcher';
import { verify } from 'fetchers/service/user.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { notifySuccess } from 'utils/notify';

function* verifyWatcher() {
  yield takeLatest(actions.goVerify, verifyTask);
}
function* verifyTask(action) {
  const { response, error } = yield call(verifyAPI, { url: action.payload });
  if (response) {
    yield put(actions.verifySuccess());
  } else {
    yield put(actions.verifyFailed(error));
  }
}
function verifyAPI(payload) {
  return verify(payload);
}

export default function* defaultSaga() {
  yield all([fork(verifyWatcher)]);
}
