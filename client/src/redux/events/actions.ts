import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  FETCH_EVENTS_BY_USER_ID,
  FETCH_EVENTS_BY_USER_ID_SUCCESS,
  FETCH_EVENTS_BY_USER_ID_ERROR,
  SET_SEARCH_TERM,
  SET_SEARCH_CITY
} from "./constants";
import {
  IEvent,
  // Fetch types
  FetchEventsAction,
  FetchEventsSuccessAction,
  FetchEventsErrorAction,

  // Create types
  CreateEventAction,
  CreateEventSuccessAction,
  CreateEventErrorAction,

  // Update types
  UpdateEventAction,
  UpdateEventSuccessAction,
  UpdateEventErrorAction,

  // Delete types
  DeleteEventAction,
  DeleteEventSuccessAction,
  DeleteEventErrorAction,

  // Fetch events by user id types
  FetchEventsByUserIdAction,
  FetchEventsByUserIdSuccessAction,
  FetchEventsByUserIdErrorAction,
  // others
  SetSearchTermAction,
  SetSearchCityAction
} from "./types";

/*** ===  FETCH EVENTS  === ***/
export const fetchEvents = (
  pageNumber: number,
  perPage: number
): FetchEventsAction => ({
  type: FETCH_EVENTS,
  payload: { pageNumber, perPage }
});

export const fetchEventsSuccess = (payload: {
  events: IEvent[];
  totalItems: number;
}): FetchEventsSuccessAction => ({
  type: FETCH_EVENTS_SUCCESS,
  payload
});

export const fetchEventsError = (
  statusCode: number
): FetchEventsErrorAction => ({
  type: FETCH_EVENTS_ERROR,
  payload: { statusCode }
});

/*** ===  CREATE EVENT  === ***/
export const createEvent = (eventData: any): CreateEventAction => ({
  type: CREATE_EVENT,
  payload: { eventData }
});

export const createEventSuccess = (
  eventData: IEvent
): CreateEventSuccessAction => ({
  type: CREATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const createEventError = (
  statusCode: number
): CreateEventErrorAction => ({
  type: CREATE_EVENT_ERROR,
  payload: { statusCode }
});

/*** ===  UPDATE EVENT  === ***/
export const updateEvent = (
  eventId: string,
  formValues: any
): UpdateEventAction => ({
  type: UPDATE_EVENT,
  payload: { eventId, formValues }
});

export const updateEventSuccess = (
  eventData: any
): UpdateEventSuccessAction => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const updateEventError = (
  statusCode: number
): UpdateEventErrorAction => ({
  type: UPDATE_EVENT_ERROR,
  payload: { statusCode }
});

/*** ===  DELETE EVENT  === ***/
export const deleteEvent = (id: string): DeleteEventAction => ({
  type: DELETE_EVENT,
  payload: { id }
});

export const deleteEventSuccess = (id: string): DeleteEventSuccessAction => ({
  type: DELETE_EVENT_SUCCESS,
  payload: { id }
});

export const deleteEventError = (
  statusCode: number
): DeleteEventErrorAction => ({
  type: DELETE_EVENT_ERROR,
  payload: { statusCode }
});

/*** ===  FETCH EVENTS BY USER ID  === ***/
export const fetchEventsByUserId = (
  userId: string
): FetchEventsByUserIdAction => ({
  type: FETCH_EVENTS_BY_USER_ID,
  payload: { userId }
});

export const fetchEventsByUserIdSuccess = (
  events: IEvent[]
): FetchEventsByUserIdSuccessAction => ({
  type: FETCH_EVENTS_BY_USER_ID_SUCCESS,
  payload: { events }
});

export const fetchEventsByUserIdError = (
  statusCode: number
): FetchEventsByUserIdErrorAction => ({
  type: FETCH_EVENTS_BY_USER_ID_ERROR,
  payload: { statusCode }
});

export const setSearchTerm = (searchTerm: string): SetSearchTermAction => ({
  type: SET_SEARCH_TERM,
  payload: { searchTerm }
});

export const setSearchCity = (searchCity: string): SetSearchCityAction => ({
  type: SET_SEARCH_CITY,
  payload: { searchCity }
});
