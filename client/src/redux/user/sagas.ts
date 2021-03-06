import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";
import {
  FETCH_USER,
  REGISTER_USER,
  UPDATE_USER,
  LOGIN,
  PASSWORD_RESET,
  SET_NEW_PASSWORD
} from "redux/user/constants";
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
  registerUserError,
  updateUserSuccess,
  updateUserError
} from "./actions";
import { pushNotificationToStack } from "redux/notifications/actions";

// Types
import {
  ILoginActionPayload,
  IPasswordResetActionPayload,
  IUserFormValues
} from "./types";

function* fetchUserSagaWatcher({
  payload
}: {
  type: string;
  payload: { userId: string };
}) {
  try {
    const userId = payload.userId;
    const resp = yield request.get(`/user/${userId}`);
    yield put(fetchUserSuccess(resp.data.user));
  } catch (error) {
    fetchUserError(error.response.status);
  }
}

function* registerUserWatcher({
  payload
}: {
  type: string;
  payload: { formData: IUserFormValues };
}) {
  const { formData } = payload;
  const userData = { ...formData };

  if (formData.userImageFile) {
    try {
      const data = new FormData();
      data.append("image", formData.userImageFile);
      const res = yield request.post(`/upload`, data, {
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
    yield put(pushNotificationToStack("User has been created"));
    history.push("/login");
  } catch (e) {
    yield put(registerUserError());
    yield put(
      pushNotificationToStack(
        "Sorry. Something went wrong. Unable to finish action"
      )
    );
  }
}

function* updateUserWatcher({
  payload
}: {
  type: string;
  payload: { userId: string; formData: IUserFormValues };
}) {
  const { userId, formData } = payload;
  const userData = { ...formData };

  if (formData.userImageFile) {
    try {
      const data = new FormData();
      data.append("image", formData.userImageFile);

      const res = yield request.post(`/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      userData.image = res.data.files[0].path;
    } catch (e) {
      console.log(e);
    }
  }

  try {
    const resp = yield request.put(`/user/${userId}`, userData);
    yield put(updateUserSuccess(resp.data.user));
    yield put(pushNotificationToStack("User has been updated"));
  } catch (e) {
    yield put(updateUserError());
    yield put(
      pushNotificationToStack(
        "Sorry. Something went wrong. Unable to finish action"
      )
    );
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
  } catch (error) {
    if (error.response.status === 404 || error.response.status === 403) {
      yield put(loginError(error.response.status));
    }
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
    yield request.post(`/auth/password-reset`, { email });
    yield put(passwordResetSuccess());
    yield put(
      pushNotificationToStack(
        `Email with instructions how to set new password has been send to email ${email}. You'll be redirected to login page in moment`
      )
    );
    setTimeout(() => {
      history.push("/login");
    }, 4000);
  } catch (e) {
    yield put(passwordResetError());
    yield put(
      pushNotificationToStack(
        "Sorry. Something went wrong. Unable to finish action"
      )
    );
  }
}

function* setNewPasswordWatcher({
  payload
}: {
  type: string;
  payload: { password: string; token: string };
}) {
  try {
    const { password, token } = payload;
    yield request.post(`/auth/set-new-password`, {
      password,
      token
    });

    yield put(passwordResetSuccess());
    yield put(
      pushNotificationToStack(
        `Your new password is active. You'll be redirected to login page in moment`
      )
    );
    setTimeout(() => {
      history.push("/login");
    }, 4000);
  } catch (e) {
    passwordResetError();
    yield put(
      pushNotificationToStack(
        "Sorry. Something went wrong. Unable to finish action"
      )
    );
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER, fetchUserSagaWatcher);
  yield takeLatest(REGISTER_USER, registerUserWatcher);
  yield takeLatest(UPDATE_USER, updateUserWatcher);
  yield takeLatest(LOGIN, loginSagaWatcher);
  yield takeLatest(PASSWORD_RESET, passwordResetSagaWatcher);
  yield takeLatest(SET_NEW_PASSWORD, setNewPasswordWatcher);
}
