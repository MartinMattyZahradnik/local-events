import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// Actions
import { fetchEventDetailSuccess } from "./actions";

// Constants
import { actionTypes as eventsActionTypes } from "./constants";

function* fetchEventDetailWatcher({
  payload
}: {
  type: string;
  payload: { eventId: string };
}) {
  const { eventId } = payload;

  try {
    const resp = yield axios.get(`http://localhost:8080/events/${eventId}`);

    yield put(fetchEventDetailSuccess(resp.data.event));
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(
    eventsActionTypes.FETCH_EVENT_DETAIL,
    fetchEventDetailWatcher
  );
}
