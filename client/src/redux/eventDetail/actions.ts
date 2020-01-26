import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_EVENT_DETAIL_ERROR,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS,
  FETCH_SIMILAR_EVENTS_SUCCESS
} from "./constants";
import {
  FetchEventDetailAction,
  FetchEventDetailSuccessAction,
  FetchEventDetailErrorAction,
  ResetEventDetailAction,
  FetchSimilarEventsAction,
  FetchSimilarEventsSuccessAction
} from "./types";
import { IEvent } from "redux/events/types";

/*** ===  FETCH EVENT DETAIL  === ***/
export const fetchEventDetail = (eventId: string): FetchEventDetailAction => ({
  type: FETCH_EVENT_DETAIL,
  payload: { eventId }
});

export const fetchEventDetailSuccess = (
  payload: IEvent
): FetchEventDetailSuccessAction => ({
  type: FETCH_EVENT_DETAIL_SUCCESS,
  payload
});

export const fetchEventDetailError = (
  statusCode: number
): FetchEventDetailErrorAction => ({
  type: FETCH_EVENT_DETAIL_ERROR,
  payload: { statusCode }
});

/*** ===  RESET EVENT DETAIL  === ***/
export const resetEventDetail = (): ResetEventDetailAction => ({
  type: RESET_EVENT_DETAIL
});

/*** ===  FETCH SIMILAR EVENT  === ***/
export const fetchSimilarEvents = (
  eventId: string,
  limit: number
): FetchSimilarEventsAction => ({
  type: FETCH_SIMILAR_EVENTS,
  payload: { eventId, limit }
});

export const fetchSimilarEventsSuccess = (
  eventId: string,
  events: IEvent[]
): FetchSimilarEventsSuccessAction => ({
  type: FETCH_SIMILAR_EVENTS_SUCCESS,
  payload: { eventId, events }
});
