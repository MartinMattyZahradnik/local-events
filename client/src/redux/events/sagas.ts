import { request } from "utils/request";
import { takeLatest, put, select } from "redux-saga/effects";

// Actions
import {
  fetchEventsSuccess,

  // createEvents
  createEventSuccess,
  createEventError,

  // Update events
  updateEventSuccess,
  updateEventError,

  // Delete events
  deleteEventSuccess,
  deleteEventError,

  // Fetch events by user id
  fetchEventsByUserIdSuccess,
  fetchEventsByUserIdError
} from "./actions";

// Types
import { FetchEventsPayload } from "./types";

// Constants
import { actionTypes as eventsActionTypes } from "./constants";

// Selectors
import { selectUserId } from "redux/user/selectors";
import { makeSelectCountryNameByCode } from "redux/application/selectors";

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

function* createEventWatcher({ payload }: { type: string; payload: any }) {
  try {
    const owner = yield select(selectUserId);
    const country = yield select(
      makeSelectCountryNameByCode(payload.eventData.address.countryCode)
    );

    const eventData = {
      ...payload.eventData,
      owner,
      address: {
        ...payload.eventData.address,
        country
      },
      ...(payload.eventData.coordinates && {
        coordinates: payload.eventData.coordinates.split(",")
      }),
      ...(payload.eventData.tags && { tags: payload.eventData.tags.split(",") })
    };

    const resp = yield request.post("/events", eventData);

    yield put(createEventSuccess(resp.data));
  } catch (error) {
    if (error.response.status) {
      yield put(createEventError(error.response.status));
    }
  }
}

function* updateEventWatcher({
  payload: { eventId, eventData }
}: {
  type: string;
  payload: any;
}) {
  try {
    const resp = yield request.put(`/events/${eventId}`, eventData);

    yield put(
      updateEventSuccess({
        totalItems: resp.data.totalItems,
        events: resp.data.events
      })
    );
  } catch (error) {
    if (error.response.status) {
      yield put(updateEventError(error.response.status));
    }
  }
}

function* deleteEventWatcher({
  payload: { id }
}: {
  type: string;
  payload: { id: string };
}) {
  try {
    yield request.delete(`/events/${id}`);
    yield put(deleteEventSuccess(id));
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status) {
      yield put(deleteEventError(error.response.status));
    }
  }
}

function* fetchEventsByIdWatcher({
  payload: { userId }
}: {
  type: string;
  payload: any;
}) {
  try {
    const resp = yield request.get(`/user/${userId}/events`);
    yield put(fetchEventsByUserIdSuccess(resp.data.events));
  } catch (error) {
    if (error.response.status) {
      yield put(fetchEventsByUserIdError(error.response.status));
    }
  }
}

export default function* userSaga() {
  yield takeLatest(eventsActionTypes.FETCH_EVENTS, fetchEventsWatcher);
  yield takeLatest(eventsActionTypes.CREATE_EVENT, createEventWatcher);
  yield takeLatest(eventsActionTypes.UPDATE_EVENT, updateEventWatcher);
  yield takeLatest(eventsActionTypes.DELETE_EVENT, deleteEventWatcher);
  yield takeLatest(
    eventsActionTypes.FETCH_EVENTS_BY_USER_ID,
    fetchEventsByIdWatcher
  );
}
