import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const getAllUsersUrl = process.env.REACT_APP_BACKEND_URL;
const setNewUserUrl = process.env.REACT_APP_BACKEND_URL + '/addUser';

function getAllUsersRequest() {
  return axios.request({
    method: 'GET',
    url: getAllUsersUrl,
  });
}

function setNewUserRequest(newUser) {
  return axios.request({
    method: 'POST',
    url: setNewUserUrl,
    data: newUser,
  });
}

function* fetchUsers() {
  try {
    const users = yield call(getAllUsersRequest);
    yield put({ type: 'GET_USERS_SUCCESS', users: users.data });
  } catch (error) {
    yield put({ type: 'GET_USERS_FAILED', message: error });
  }
}

function* setNewUser(data) {
  const newUser = {
    name: data.payload.name.value,
    email: data.payload.email.value,
    age: data.payload.age.value,
  };

  try {
    yield call(setNewUserRequest, newUser);
    yield put({ type: 'ADD_USER_SUCCESS', payload: newUser });
  } catch (error) {
    yield put({ type: 'ADD_USER_FAILED', message: error });
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery('GET_USERS_REQUESTED', fetchUsers);
}

export function* watchSetNewUserSaga() {
  yield takeEvery('SET_NEW_USER', setNewUser);
}
