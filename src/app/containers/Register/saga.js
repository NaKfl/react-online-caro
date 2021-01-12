import { register } from 'fetchers/authFetcher';
import { sendMailVerify } from 'fetchers/service/user.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { notifySuccess } from 'utils/notify';
import i18n from 'locales/i18n';

function* registerWatcher() {
  yield takeLatest(actions.register, registerTask);
}

function* registerTask(action) {
  const { response, error } = yield call(registerAPI, action.payload);
  if (response) {
    const res = yield call(sendMailAPI, {
      ...response,
    });
    if (res.response) {
      yield put(actions.registerSuccess());
      notifySuccess(i18n.t('Register.checkEmail'));
    } else {
      yield put(actions.registerFailed(res.error?.data));
    }
  } else {
    yield put(actions.registerFailed(error.data));
  }
}

function registerAPI(payload) {
  return register(payload);
}
function sendMailAPI(payload) {
  return sendMailVerify(payload);
}
export default function* defaultSaga() {
  yield all([fork(registerWatcher)]);
}
