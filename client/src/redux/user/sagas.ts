import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";
import { actionTypes as userActionTypes } from "redux/user/constants";

// Actions
import {
  loginSuccess,
  loginError,
  passwordResetSuccess,
  passwordResetError
} from "./actions";

// Types
import { ILoginActionPayload, IPasswordResetActionPayload } from "./types";

function* fetchUserSagaWatcher({ meta, payload }: any) {
  yield console.log("fetchUserSagaWatcher");
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
  yield takeLatest(userActionTypes.LOGIN, loginSagaWatcher);
  yield takeLatest(userActionTypes.PASSWORD_RESET, passwordResetSagaWatcher);
}
