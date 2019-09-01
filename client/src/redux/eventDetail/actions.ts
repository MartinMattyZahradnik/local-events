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

export const fetchSimilarEvents = (eventId: string, limit: number) => ({
  type: actionTypes.FETCH_SIMILAR_EVENTS,
  payload: { eventId, limit }
});

export const fetchSimilarEventsSuccess = (
  eventId: string,
  events: IEvent[]
) => ({
  type: actionTypes.FETCH_SIMILAR_EVENTS_SUCCESS,
  payload: { eventId, events }
});
