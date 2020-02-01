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
import { FetchEventsPayload, IEventFormValues } from "./types";

// Constants
import {
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS_BY_USER_ID
} from "./constants";

// Selectors
import { selectUserId } from "redux/user/selectors";
import { makeSelectCountryNameByCode } from "redux/application/selectors";
import { selectSearchCity, selectSearchTerm } from "./selectors";

function* fetchEventsWatcher({
  payload
}: {
  type: string;
  payload: FetchEventsPayload;
}) {
  const { perPage, pageNumber } = payload;
  const offset = (pageNumber - 1) * perPage;

  try {
    const city = yield select(selectSearchCity);
    const searchTerm = yield select(selectSearchTerm);

    const resp = yield request.get(
      `/events?offset=${offset}&limit=${perPage}&city=${city}&searchTerm=${searchTerm}`
    );

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

function* createEventWatcher({
  payload
}: {
  type: string;
  payload: { eventData: IEventFormValues };
}) {
  try {
    const owner = yield select(selectUserId);
    const country = yield select(
      makeSelectCountryNameByCode(payload.eventData.address.countryCode)
    );

    if (payload.eventData.eventImageFile) {
      try {
        const data = new FormData();
        data.append("image", payload.eventData.eventImageFile);
        const res = yield request.post(`/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        payload.eventData.imageUrl = res.data.files[0].path;
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
        coordinates: payload.eventData.coordinates
          .split(",")
          .map(value => parseFloat(value))
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
  payload: { eventId: string; formValues: IEventFormValues };
}) {
  const values = {
    ...formValues,
    coordinates: Array()
  };
  if (formValues.eventImageFile) {
    try {
      const data = new FormData();
      data.append("image", formValues.eventImageFile);
      const res = yield request.post(`/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      values.imageUrl = res.data.files[0].path;
    } catch (e) {
      yield put(
        pushNotificationToStack("Something went wrong. Unable to upload image")
      );
    }
  }

  if (formValues.coordinates) {
    formValues.coordinates.split(",").forEach((value: string) => {
      const coordinate = parseFloat(value);
      if (typeof coordinate === "number") {
        values.coordinates.push(coordinate);
      } else {
        values.coordinates.push(0);
      }
    });
  }

  try {
    const resp = yield request.put(`/events/${eventId}`, values);
    yield put(updateEventSuccess(eventId, resp.data));
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
  payload: { userId: string };
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
  yield takeLatest(FETCH_EVENTS, fetchEventsWatcher);
  yield takeLatest(CREATE_EVENT, createEventWatcher);
  yield takeLatest(UPDATE_EVENT, updateEventWatcher);
  yield takeLatest(DELETE_EVENT, deleteEventWatcher);
  yield takeLatest(FETCH_EVENTS_BY_USER_ID, fetchEventsByIdWatcher);
}
