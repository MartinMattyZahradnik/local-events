import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { actionTypes as eventsActionTypes } from "actions/eventsActions";

// Actions
import { fetchEventsSuccess } from "actions/eventsActions";

function* fetchEventsWatcher({ meta, payload }: any) {
  try {
    const resp = yield axios.get("http://localhost:8080/events");

    yield put(fetchEventsSuccess(resp.data.events));
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(eventsActionTypes.FETCH_EVENTS, fetchEventsWatcher);
}
