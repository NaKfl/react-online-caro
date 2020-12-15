import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* gameWatcher() {
  yield takeLatest(actions.chessAtPosition, gameTask);
}
function* gameTask(action) {
  yield put(action.chessAtPosition);
}
export default function* defaultSaga() {
  yield all([fork(gameWatcher)]);
}
