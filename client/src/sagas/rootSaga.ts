import { all } from "redux-saga/effects";

import userSaga from "sagas/userSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
