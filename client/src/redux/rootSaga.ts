import { spawn } from "redux-saga/effects";

import applicationSaga from "redux/application/sagas";
import userSaga from "redux/user/sagas";
import eventsSaga from "redux/events/sagas";
import eventDetailSaga from "redux/eventDetail/sagas";

export default function* rootSaga() {
  yield spawn(applicationSaga);
  yield spawn(userSaga);
  yield spawn(eventsSaga);
  yield spawn(eventDetailSaga);
}
