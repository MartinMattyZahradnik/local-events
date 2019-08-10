import { takeLatest } from "redux-saga/effects";
import { actionTypes as userActionTypes } from "actions/userActions";

function* exampleSaga({ meta, payload }: any) {
  yield console.log("exampleSaga");
}

export default function* userSaga() {
  yield takeLatest(userActionTypes.FETCH_USER, exampleSaga);
}
