import * as type from '../types';

const intialState = {
  users: [],
  loading: false,
  error: undefined,
};

export default function users(state = intialState, action) {
  switch (action.type) {
    case type.GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
        error: action.message,
      };
    case type.GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.SET_NEW_USER:
      return {
        ...state,
        loading: true,
        error: action.message,
      };
    case type.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.ADD_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
