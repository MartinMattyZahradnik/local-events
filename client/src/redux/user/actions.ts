import { createSelector } from "reselect";

// Types
import { IState } from "redux/rootReducer";
import { IUser } from "./types";

// Constants
import { actionTypes } from "redux/user/constants";

/*** ===  FETCH USER === ***/
export const fetchUser = (userId?: string) => ({
  type: actionTypes.FETCH_USER,
  payload: { userId }
});

export const fetchUserSuccess = (payload: IUser[]) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserError = () => ({
  type: actionTypes.FETCH_USER_ERROR
});

const getUser = (state: IState) => state.user.result;
export const selectUser = createSelector(
  getUser,
  userState => userState
);

/*** ===  LOGIN === ***/
export const login = (email: string, password: string) => ({
  type: actionTypes.LOGIN,
  payload: { email, password }
});

export const loginSuccess = (user: IUser) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = (statusCode: number) => ({
  type: actionTypes.LOGIN_ERROR,
  payload: { statusCode }
});

/*** ===  LOGOUT === ***/
export const logout = () => ({
  type: actionTypes.LOGOUT
});

/*** ===  PASSWORD RESET  === ***/
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

/*** ===  REGISTER USER  === ***/
export const registerUser = (formData: any) => ({
  type: actionTypes.REGISTER_USER,
  payload: { formData }
});

export const registerUserSuccess = (user: any) => ({
  type: actionTypes.REGISTER_USER_SUCCESS,
  payload: { user }
});

export const registerUserError = () => ({
  type: actionTypes.REGISTER_USER_ERROR
});

/*** ===  UPDATE USER  === ***/
export const updateUser = (userID: string, formData: any) => ({
  type: actionTypes.UPDATE_USER,
  payload: { formData }
});

export const updateUserSuccess = (user: any) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: { user }
});

export const updateUserError = () => ({
  type: actionTypes.UPDATE_USER_ERROR
});

export const setNewPassword = (password: string, token: string) => ({
  type: actionTypes.SET_NEW_PASSWORD,
  payload: { password, token }
});
