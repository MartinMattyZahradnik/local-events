import { spawn } from "redux-saga/effects";

import userSaga from "redux/user/sagas";
import eventsSaga from "redux/events/sagas";

export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(eventsSaga);
}
