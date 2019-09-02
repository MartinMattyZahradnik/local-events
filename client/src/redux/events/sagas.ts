import { request } from "utils/request";
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
    const resp = yield request.get(`/events?offset=${offset}&limit=${perPage}`);

    yield put(
      fetchEventsSuccess({
        totalItems: resp.data.totalItems,
        events: resp.data.events
      })
    );
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(eventsActionTypes.FETCH_EVENTS, fetchEventsWatcher);
}
