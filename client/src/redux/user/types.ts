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
} from "./constants";

export type AvailableUserRoles = "admin" | "user" | "visitor";
type Gender = "male" | "female" | "other";

export interface IUserFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: Date;
  password: string;
  passwordConfirm: string;
  image: string;
  phone?: string;
  gender: string;
  address: {
    street: string;
    postalCode?: string;
    city: string;
    country: string;
  };
}

export interface IUser extends IUserFormValues {
  _id: string;
  userRole: AvailableUserRoles;
}

export interface ILoginActionPayload {
  email: string;
  password: string;
}

export interface IPasswordResetActionPayload {
  email: string;
}

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: { userId: string };
}

export interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: { user: IUser };
}

export interface FetchUserErrorAction {
  type: typeof FETCH_USER_ERROR;
  payload: { statusCode: number };
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: { email: string; password: string };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: IUser };
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR;
  payload: { statusCode: number };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface PasswordResetAction {
  type: typeof PASSWORD_RESET;
  payload: { email: string };
}

export interface PasswordResetSuccessAction {
  type: typeof PASSWORD_RESET_SUCCESS;
}

export interface PasswordResetErrorAction {
  type: typeof PASSWORD_RESET_ERROR;
}

export interface RegisterUserAction {
  type: typeof REGISTER_USER;
  payload: { formData: IUserFormValues };
}

export interface RegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  payload: { user: IUser };
}

export interface RegisterUserErrorAction {
  type: typeof REGISTER_USER_ERROR;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: { userId: string; formData: IUserFormValues };
}

export interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  payload: { user: IUserFormValues };
}

export interface UpdateUserErrorAction {
  type: typeof UPDATE_USER_ERROR;
}

export interface SetNewPasswordAction {
  type: typeof SET_NEW_PASSWORD;
  payload: { password: string; token: string };
}

export type UserErrorReducerTypes =
  | FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export type UserResultReducerTypes =
  | FetchUserSuccessAction
  | LoginSuccessAction
  | LogoutAction;

export type UserIsLoadingReducerTypes =
  | FetchUserAction
  | FetchUserErrorAction
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export interface IUserReducerState {
  error: null | number;
  result: IUser | null;
  isLoading: boolean;
}
