import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// Actions
import { fetchEventsSuccess } from "./actions";

// Types
import { FetchEventsPayload } from "./types";

// Constants
import { actionTypes as eventsActionTypes } from "./constants";

function* fetchEventsWatcher({
  payload
}: {
  type: string;
  payload: FetchEventsPayload;
}) {
  const { perPage, pageNumber } = payload;
  const offset = (pageNumber - 1) * perPage;

  try {
    const resp = yield axios.get(
      `http://localhost:8080/events?offset=${offset}&limit=${perPage}`
    );

    yield put(fetchEventsSuccess(resp.data.events));
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(eventsActionTypes.FETCH_EVENTS, fetchEventsWatcher);
}
