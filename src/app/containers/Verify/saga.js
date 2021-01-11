import { verify } from 'fetchers/service/user.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { storeAuthInfo } from 'utils/localStorageUtils';
import { actions as actionsLogin } from 'app/containers/Login/slice';
function* verifyWatcher() {
  yield takeLatest(actions.goVerify, verifyTask);
}
function* verifyTask(action) {
  const { response, error } = yield call(verifyAPI, { url: action.payload });
  if (response) {
    yield put(actions.verifySuccess());
    yield put(actionsLogin.loginSuccess(response));
    yield call(storeAuthInfo(response));
  } else {
    const { message } = error.data;
    if (message === 'jwt expired') {
      yield put(actions.expiredToken(error));
    } else yield put(actions.verifyFailed(error));
  }
}
function verifyAPI(payload) {
  return verify(payload);
}

export default function* defaultSaga() {
  yield all([fork(verifyWatcher)]);
}
