import { actionTypes } from "./constants";
import { IEvent } from "./types";

export const fetchEventDetail = (eventId: string) => ({
  type: actionTypes.FETCH_EVENT_DETAIL,
  payload: { eventId }
});

export const fetchEventDetailSuccess = (payload: IEvent) => ({
  type: actionTypes.FETCH_EVENT_DETAIL_SUCCESS,
  payload
});

export const resetEventDetail = () => ({
  type: actionTypes.RESET_EVENT_DETAIL
});

export const fetchSimilarEvents = (event: IEvent) => ({
  type: actionTypes.FETCH_SIMILAR_EVENTS,
  payload: event
});
