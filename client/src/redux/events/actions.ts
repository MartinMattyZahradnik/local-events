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

export const createEventSuccess = (eventData: any) => ({
  type: actionTypes.CREATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const createEventError = (eventData: any) => ({
  type: actionTypes.CREATE_EVENT_ERROR,
  payload: { eventData }
});

/*** ===  UPDATE EVENT  === ***/
export const updateEvent = (eventData: any) => ({
  type: actionTypes.UPDATE_EVENT,
  payload: { eventData }
});

export const updateEventSuccess = (eventData: any) => ({
  type: actionTypes.UPDATE_EVENT_SUCCESS,
  payload: { eventData }
});

export const updateEventError = (eventData: any) => ({
  type: actionTypes.UPDATE_EVENT_ERROR,
  payload: { eventData }
});
