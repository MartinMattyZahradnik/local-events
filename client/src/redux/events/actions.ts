import { actionTypes } from "./constants";
import { IEvent } from "./types";

export const fetchEvents = (pageNumber: number, perPage: number) => ({
  type: actionTypes.FETCH_EVENTS,
  payload: { pageNumber, perPage }
});

export const fetchEventsSuccess = (payload: {
  events: IEvent[];
  totalItems: number;
}) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload
});

export const fetchEventsError = (payload: any) => ({
  type: actionTypes.FETCH_EVENTS_ERROR,
  payload
});

/*** ===  CREATE EVENT  === ***/
export const createEvent = (eventData: any) => ({
  type: actionTypes.CREATE_EVENT,
  payload: { eventData }
});

export const createEventSuccess = (eventData: IEvent) => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const createEventError = (eventData: any) => ({
  type: actionTypes.CREATE_EVENT_ERROR,
  payload: { eventData }
});

/*** ===  UPDATE EVENT  === ***/
export const updateEvent = (eventId: string, eventData: any) => ({
  type: actionTypes.UPDATE_EVENT,
  payload: { eventId, eventData }
});

export const updateEventSuccess = (eventData: any) => ({
  type: actionTypes.UPDATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const updateEventError = (eventData: any) => ({
  type: actionTypes.UPDATE_EVENT_ERROR,
  payload: { eventData }
});

/*** ===  FETCH EVENTS BY USER ID  === ***/
export const fetchEventsByUserId = (userId: string) => ({
  type: actionTypes.FETCH_EVENTS_BY_USER_ID,
  payload: { userId }
});

export const fetchEventsByUserIdSuccess = (events: IEvent[]) => ({
  type: actionTypes.FETCH_EVENTS_BY_USER_ID_SUCCESS,
  payload: { events }
});

export const fetchEventsByUserIdError = (statusCode: number) => ({
  type: actionTypes.FETCH_EVENTS_BY_USER_ID_ERROR,
  payload: { statusCode }
});

/*** ===  DELETE EVENT  === ***/
export const deleteEvent = (id: string) => ({
  type: actionTypes.DELETE_EVENT,
  payload: { id }
});

export const deleteEventSuccess = (id: string) => ({
  type: actionTypes.DELETE_EVENT_SUCCESS,
  payload: { id }
});

export const deleteEventError = (id: string) => ({
  type: actionTypes.DELETE_EVENT_ERROR,
  payload: { id }
});
