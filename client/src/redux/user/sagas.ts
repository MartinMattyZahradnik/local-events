import { takeLatest } from "redux-saga/effects";
import { actionTypes as userActionTypes } from "redux/user/constants";

function* fetchUserSagaWatcher({ meta, payload }: any) {
  yield console.log("fetchUserSagaWatcher");
}

export default function* userSaga() {
  yield takeLatest(userActionTypes.FETCH_USER, fetchUserSagaWatcher);
}
