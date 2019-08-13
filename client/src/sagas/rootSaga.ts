import { spawn } from "redux-saga/effects";

import userSaga from "sagas/userSaga";
import eventsSaga from "sagas/eventsSaga";

export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(eventsSaga);
}
