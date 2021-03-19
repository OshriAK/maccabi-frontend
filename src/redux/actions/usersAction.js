import * as type from '../types';

export function getUsers() {
  return {
    type: type.GET_USERS_REQUESTED,
  };
}

export function setNewUser(user) {
  return {
    type: type.SET_NEW_USER,
    payload: user,
  };
}
