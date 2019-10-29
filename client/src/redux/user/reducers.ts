import { combineReducers } from "redux";

import { actionTypes as userActionsTypes } from "redux/user/constants";

function error(state = false, { type, payload }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER_ERROR:
      return payload;

    case userActionsTypes.FETCH_USER:
    case userActionsTypes.FETCH_USER_SUCCESS:
    case userActionsTypes.LOGIN_SUCCESS:
    case userActionsTypes.LOGOUT:
      return false;

    case userActionsTypes.LOGIN_ERROR:
      return payload.statusCode;

    default:
      return state;
  }
}

function result(state = null, { type, payload }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER_SUCCESS:
    case userActionsTypes.LOGIN_SUCCESS:
      return payload.user;

    case userActionsTypes.LOGOUT:
      return null;

    default:
      return state;
  }
}

function isLoading(state = {}, { type }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER:
    case userActionsTypes.LOGIN:
      return true;

    case userActionsTypes.LOGIN_SUCCESS:
    case userActionsTypes.LOGIN_ERROR:
    case userActionsTypes.LOGOUT:
      return false;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
