import { combineReducers } from "redux";

import { actionTypes as userActionsTypes } from "redux/user/constants";

function error(state = null, { type, payload }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER_ERROR:
      return payload;

    case userActionsTypes.FETCH_USER:
    case userActionsTypes.FETCH_USER_SUCCESS:
      return false;

    default:
      return state;
  }
}

function result(state = {}, { type, payload }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER_SUCCESS:
      return payload;

    default:
      return state;
  }
}

function isLoading(state = {}, { type }: any) {
  switch (type) {
    case userActionsTypes.FETCH_USER:
      return true;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
