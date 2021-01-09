import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
// import { notifyError, notifySuccess } from 'utils/notify';
import { getList, update, getRate } from 'fetchers/service/user.service.js';

function* getListWatcher() {
  yield takeLatest(actions.getUserList, getListTask);
}
function* getListTask() {
  const { response, error } = yield call(getListUserAPI);
  if (response) {
    yield put(actions.getListSuccess(response));
  } else {
    yield put(actions.getListFalied(error));
  }
}
function getListUserAPI() {
  return getList();
}
function* updateRecordWatcher() {
  yield takeLatest(actions.updateRecord, updateRecordTask);
}
function* updateRecordTask(action) {
  const { response, error } = yield call(updateRecordAPI, action.payload);
  if (response) {
    yield put(actions.updateSuccess());
    yield put(actions.getUserList());
  } else {
    yield put(actions.updateFailed(error));
  }
}
function updateRecordAPI(payload) {
  return update(payload);
}

function* getRateWatcher() {
  yield takeLatest(actions.getRate, getRateTask);
}
function* getRateTask(action) {
  const { response, error } = yield call(getRateAPI, action.payload);
  if (response) {
    yield put(actions.getRateSuccess(response));
  } else {
    yield put(actions.getRateFailed(error));
  }
}
function getRateAPI(payload) {
  return getRate(payload);
}
export default function* defaultSaga() {
  yield all([
    fork(getListWatcher),
    fork(updateRecordWatcher),
    fork(getRateWatcher),
  ]);
}
