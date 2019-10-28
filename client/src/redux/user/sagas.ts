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
  const userData = { ...formData };

  if (formData.image) {
    try {
      const data = new FormData();
      data.append("image", formData.image);
      const res = yield request.post(`http://localhost:8080/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      userData.image = res.data.files[0].path;
    } catch (e) {
      console.log(e);
    }
  }

  try {
    const resp = yield request.post(`/user`, userData);
    yield put(registerUserSuccess(resp.data.user));
    history.push("/user/login");
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
    const resp = yield request.post(`/auth/login`, payload);
    sessionStorage.setItem("jwtToken", resp.data.token);
    request.defaults.headers.Authorization = resp.data.token;
    yield put(loginSuccess(resp.data.user));
    history.push("/");
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
    const resp = yield request.post(`/auth/password-reset`, { email });

    yield put(passwordResetSuccess());
  } catch (e) {
    passwordResetError();
    console.error(e);
  }
}

function* setNewPasswordWatcher({ payload }: { type: string; payload: any }) {
  try {
    const { password, token } = payload;
    yield request.post(`/auth/set-new-password`, {
      password,
      token
    });

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
  yield takeLatest(userActionTypes.SET_NEW_PASSWORD, setNewPasswordWatcher);
}
