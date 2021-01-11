import {
  requestForgotPassword,
  requestRecoveryPassword,
} from 'fetchers/service/user.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as actionsLogin } from 'app/containers/Login/slice';

function* forgotPasswordWatcher() {
  yield takeLatest(actions.sendMail, forgotPasswordTask);
}

function* forgotPasswordTask(action) {
  const { response, error } = yield call(forgotPasswordAPI, action.payload);
  if (response) {
    yield put(actions.increaseStep(1));
  } else {
    yield put(actions.fetchError(error));
  }
}

function forgotPasswordAPI(payload) {
  return requestForgotPassword(payload);
}

function* recoverPasswordWatcher() {
  yield takeLatest(actions.requestRecovery, recoverPasswordTask);
}
function* recoverPasswordTask(action) {
  const { response, error } = yield call(recoverAPI, action.payload);
  console.log(
    '🚀 ~ file: saga.js ~ line 31 ~ function*recoverPasswordTask ~ response',
    response,
  );

  if (response) {
    yield put(actions.requestRecoverySuccess(response));
  } else {
    yield put(actions.fetchError(error));
  }
}
function recoverAPI(payload) {
  return requestRecoveryPassword(payload);
}
export default function* defaultSaga() {
  yield all([fork(forgotPasswordWatcher), fork(recoverPasswordWatcher)]);
}
