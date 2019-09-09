import { createSelector } from "reselect";

// Types
import { IState } from "redux/rootReducer";
import { IUser } from "./types";

// Constants
import { actionTypes } from "redux/user/constants";

export const fetchUser = () => ({
  type: actionTypes.FETCH_USER
});

export const fetchUserSucces = (payload: IUser[]) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserError = (payload: any) => ({
  type: actionTypes.FETCH_USER_ERROR,
  payload
});

const getUser = (state: IState) => state.user.result;
export const selectUser = createSelector(
  getUser,
  userState => userState
);

export const login = (email: string, password: string) => ({
  type: actionTypes.LOGIN,
  payload: { email, password }
});

export const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS
});

export const loginError = () => ({
  type: actionTypes.LOGIN_ERROR
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const passwordReset = (email: string) => ({
  type: actionTypes.PASSWORD_RESET,
  payload: { email }
});

export const passwordResetSuccess = () => ({
  type: actionTypes.PASSWORD_RESET_SUCCESS
});

export const passwordResetError = () => ({
  type: actionTypes.PASSWORD_RESET_ERROR
});
