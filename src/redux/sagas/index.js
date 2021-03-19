import { all } from 'redux-saga/effects';
import { watchGetUsersSaga, watchSetNewUserSaga } from './userSaga';

export default function* rootSaga() {
  yield all([watchGetUsersSaga(), watchSetNewUserSaga()]);
}
