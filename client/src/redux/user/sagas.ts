import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";
import { actionTypes as userActionTypes } from "redux/user/constants";
import { history } from "App";

// Actions
import {
  fetchUserError,
  fetchUserSuccess,
  loginSuccess,
  loginError,
  passwordResetSuccess,
  passwordResetError,
  registerUserSuccess,
  registerUserError
} from "./actions";

// Types
import {
  ILoginActionPayload,
  IPasswordResetActionPayload,
  IRegisterUserActionPayload
} from "./types";

function* fetchUserSagaWatcher({
  payload
}: {
  type: string;
  payload: { userId?: string };
}) {
  try {
    const userId = payload.userId;
    const resp = yield request.get(`/user/${userId}`);

    yield put(fetchUserSuccess(resp.data.user));
  } catch (e) {
    fetchUserError();
    console.error(e);
  }
}

function* registerUserWatcher({
  payload
}: {
  type: string;
  payload: { formData: IRegisterUserActionPayload };
}) {
  const { formData } = payload;

  try {
    const resp = yield request.post(`/user`, formData);
    yield put(registerUserSuccess(resp.data.user));
    history.push("/login");
  } catch (e) {
    registerUserError();
    console.error(e);
  }
}

function* updateUserWatcher({
  payload
}: {
  type: string;
  payload: { userId: string; formData: IRegisterUserActionPayload };
}) {
  const { userId, formData } = payload;

  try {
    const resp = yield request.put(`/user/${userId}`, formData);

    yield put(registerUserSuccess(resp.data.user));
  } catch (e) {
    registerUserError();
    console.error(e);
  }
}

function* loginSagaWatcher({
  payload
}: {
  type: string;
  payload: ILoginActionPayload;
}) {
  try {
    const resp = yield request.post(`/login`, payload);

    yield put(loginSuccess());
  } catch (e) {
    loginError();
    console.error(e);
  }
}

function* passwordResetSagaWatcher({
  payload
}: {
  type: string;
  payload: IPasswordResetActionPayload;
}) {
  try {
    const { email } = payload;
    const resp = yield request.post(`/password-reset`, email);

    yield put(passwordResetSuccess());
  } catch (e) {
    passwordResetError();
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(userActionTypes.FETCH_USER, fetchUserSagaWatcher);
  yield takeLatest(userActionTypes.REGISTER_USER, registerUserWatcher);
  yield takeLatest(userActionTypes.UPDATE_USER, updateUserWatcher);
  yield takeLatest(userActionTypes.LOGIN, loginSagaWatcher);
  yield takeLatest(userActionTypes.PASSWORD_RESET, passwordResetSagaWatcher);
}
