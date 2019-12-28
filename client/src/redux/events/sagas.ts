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
import { pushNotificationToStack } from "redux/notifications/actions";

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

    if (payload.eventData.image) {
      try {
        const data = new FormData();
        data.append("image", payload.eventData.image);
        const res = yield request.post(`/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        payload.eventData.imageUrl = `${res.data.files[0].path}`;
      } catch (e) {
        yield put(
          pushNotificationToStack(
            "Something went wrong. Unable to upload image"
          )
        );
      }
    }

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
    yield put(pushNotificationToStack("Event has been created"));
  } catch (error) {
    if (error.response.status) {
      yield put(createEventError(error.response.status));
      yield put(
        pushNotificationToStack(
          "Sorry. Something went wrong. Unable to finish action"
        )
      );
    }
  }
}

function* updateEventWatcher({
  payload: { eventId, formValues }
}: {
  type: string;
  payload: any;
}) {
  if (formValues.image) {
    try {
      const data = new FormData();
      data.append("image", formValues.image);
      const res = yield request.post(`/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      formValues.imageUrl = `/${res.data.files[0].filename}`;
    } catch (e) {
      yield put(
        pushNotificationToStack("Something went wrong. Unable to upload image")
      );
    }
  }

  try {
    const resp = yield request.put(`/events/${eventId}`, formValues);
    yield put(
      updateEventSuccess({
        totalItems: resp.data.totalItems,
        events: resp.data.events
      })
    );
    yield put(pushNotificationToStack("Event has been updated"));
  } catch (error) {
    if (error.response.status) {
      yield put(updateEventError(error.response.status));
      yield put(
        pushNotificationToStack(
          "Sorry. Something went wrong. Unable to finish action"
        )
      );
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
    yield put(pushNotificationToStack("Event has been deleted"));
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status) {
      yield put(deleteEventError(error.response.status));
      yield put(
        pushNotificationToStack(
          "Sorry. Something went wrong. Unable to finish action"
        )
      );
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
      yield put(
        pushNotificationToStack(
          "Sorry. Something went wrong. Unable to finish action"
        )
      );
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
