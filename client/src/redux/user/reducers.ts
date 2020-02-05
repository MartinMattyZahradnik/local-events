import { combineReducers } from "redux";
import {
  IUser,
  UserErrorReducerTypes,
  UserResultReducerTypes,
  UserIsLoadingReducerTypes
} from "./types";

import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  UPDATE_USER_SUCCESS
} from "redux/user/constants";

export const defaultState = {
  error: null,
  result: null,
  isLoading: false
};

function error(state: null | number = null, action: UserErrorReducerTypes) {
  switch (action.type) {
    case FETCH_USER:
    case FETCH_USER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT:
      return null;

    case LOGIN_ERROR:
    case FETCH_USER_ERROR:
      return action.payload.statusCode;

    default:
      return state;
  }
}

function result(state: null | IUser = null, action: UserResultReducerTypes) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return action.payload.user;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}

function isLoading(state: boolean = false, action: UserIsLoadingReducerTypes) {
  switch (action.type) {
    case FETCH_USER:
    case LOGIN:
      return true;

    case LOGIN_SUCCESS:
    case FETCH_USER_ERROR:
    case LOGIN_ERROR:
    case LOGOUT:
      return false;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
