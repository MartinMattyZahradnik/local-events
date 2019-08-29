import { actionTypes } from "./constants";
import { IEvent } from "./types";

export const fetchEvents = (pageNumber: number, perPage: number) => ({
  type: actionTypes.FETCH_EVENTS,
  payload: { pageNumber, perPage }
});

export const fetchEventsSuccess = (payload: IEvent[]) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload
});

export const fetchEventsError = (payload: any) => ({
  type: actionTypes.FETCH_EVENTS_ERROR,
  payload
});
