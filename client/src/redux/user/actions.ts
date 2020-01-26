// Types
import {
  IUser,
  FetchUserAction,
  FetchUserSuccessAction,
  FetchUserErrorAction,
  LoginAction,
  LoginSuccessAction,
  LoginErrorAction,
  LogoutAction,
  PasswordResetAction,
  PasswordResetSuccessAction,
  PasswordResetErrorAction,
  RegisterUserAction,
  RegisterUserSuccessAction,
  RegisterUserErrorAction,
  UpdateUserAction,
  UpdateUserSuccessAction,
  UpdateUserErrorAction,
  SetNewPasswordAction,
  IUserFormValues
} from "./types";

// Constants
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  SET_NEW_PASSWORD
} from "redux/user/constants";

/*** ===  FETCH USER === ***/
export const fetchUser = (userId: string): FetchUserAction => ({
  type: FETCH_USER,
  payload: { userId }
});

export const fetchUserSuccess = (user: IUser): FetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: { user }
});

export const fetchUserError = (statusCode: number): FetchUserErrorAction => ({
  type: FETCH_USER_ERROR,
  payload: { statusCode }
});

/*** ===  LOGIN === ***/
export const login = (email: string, password: string): LoginAction => ({
  type: LOGIN,
  payload: { email, password }
});

export const loginSuccess = (user: IUser): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});

export const loginError = (statusCode: number): LoginErrorAction => ({
  type: LOGIN_ERROR,
  payload: { statusCode }
});

/*** ===  LOGOUT === ***/
export const logout = (): LogoutAction => ({
  type: LOGOUT
});

/*** ===  PASSWORD RESET  === ***/
export const passwordReset = (email: string): PasswordResetAction => ({
  type: PASSWORD_RESET,
  payload: { email }
});

export const passwordResetSuccess = (): PasswordResetSuccessAction => ({
  type: PASSWORD_RESET_SUCCESS
});

export const passwordResetError = (): PasswordResetErrorAction => ({
  type: PASSWORD_RESET_ERROR
});

/*** ===  REGISTER USER  === ***/
export const registerUser = (
  formData: IUserFormValues
): RegisterUserAction => ({
  type: REGISTER_USER,
  payload: { formData }
});

export const registerUserSuccess = (
  user: IUser
): RegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload: { user }
});

export const registerUserError = (): RegisterUserErrorAction => ({
  type: REGISTER_USER_ERROR
});

/*** ===  UPDATE USER  === ***/
export const updateUser = (
  userId: string,
  formData: IUserFormValues
): UpdateUserAction => ({
  type: UPDATE_USER,
  payload: { userId, formData }
});

export const updateUserSuccess = (user: IUser): UpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user }
});

export const updateUserError = (): UpdateUserErrorAction => ({
  type: UPDATE_USER_ERROR
});

export const setNewPassword = (
  password: string,
  token: string
): SetNewPasswordAction => ({
  type: SET_NEW_PASSWORD,
  payload: { password, token }
});
