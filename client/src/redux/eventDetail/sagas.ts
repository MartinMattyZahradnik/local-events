import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";

// Actions
import { fetchEventDetailSuccess, fetchSimilarEventsSuccess } from "./actions";

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
    const resp = yield request.get(`/events/${eventId}`);

    yield put(fetchEventDetailSuccess(resp.data.event));
  } catch (e) {
    console.error(e);
  }
}

function* fetchSimilarEventsWatcher({
  payload
}: {
  type: string;
  payload: { eventId: string; limit: number };
}) {
  const { eventId, limit } = payload;

  try {
    const resp = yield request.get(`/events/${eventId}/similar?limit=${limit}`);

    yield put(fetchSimilarEventsSuccess(eventId, resp.data.similarEvents));
  } catch (e) {
    console.error(e);
  }
}

export default function* userSaga() {
  yield takeLatest(
    eventsActionTypes.FETCH_EVENT_DETAIL,
    fetchEventDetailWatcher
  );

  yield takeLatest(
    eventsActionTypes.FETCH_SIMILAR_EVENTS,
    fetchSimilarEventsWatcher
  );
}
