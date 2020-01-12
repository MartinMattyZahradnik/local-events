import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS,
  FETCH_SIMILAR_EVENTS_SUCCESS
} from "./constants";
import {
  IEvent,
  FetchEventDetailAction,
  FetchEventDetailSuccessAction,
  ResetEventDetailAction,
  FetchSimilarEventsAction,
  FetchSimilarEventsSuccessAction
} from "./types";

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
