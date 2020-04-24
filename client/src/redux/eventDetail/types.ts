import { IEvent } from "redux/events/types";
import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_SIMILAR_EVENTS_SUCCESS,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS,
  FETCH_EVENT_DETAIL_ERROR,
} from "./constants";

export type IResultState = IEvent | null;

export type IEventDetailReducerState = {
  result: IResultState;
  error: null | number;
  isLoading: boolean;
};

export interface FetchEventDetailAction {
  type: typeof FETCH_EVENT_DETAIL;
  payload: { eventId: string };
}

export interface FetchEventDetailSuccessAction {
  type: typeof FETCH_EVENT_DETAIL_SUCCESS;
  payload: IEvent;
}

export interface FetchEventDetailErrorAction {
  type: typeof FETCH_EVENT_DETAIL_ERROR;
  payload: { statusCode: number };
}

export interface ResetEventDetailAction {
  type: typeof RESET_EVENT_DETAIL;
}

export interface FetchSimilarEventsAction {
  type: typeof FETCH_SIMILAR_EVENTS;
  payload: { eventId: string; limit: number };
}

export interface FetchSimilarEventsSuccessAction {
  type: typeof FETCH_SIMILAR_EVENTS_SUCCESS;
  payload: { eventId: string; events: IEvent[] };
}

export type EventDetailErrorReducerTypes =
  | FetchEventDetailSuccessAction
  | FetchSimilarEventsSuccessAction
  | ResetEventDetailAction
  | FetchEventDetailAction
  | FetchEventDetailErrorAction;

export type EventDetailLoadingReducerTypes =
  | FetchEventDetailAction
  | FetchEventDetailSuccessAction
  | FetchEventDetailErrorAction
  | ResetEventDetailAction;

export type EventDetailResultReducerTypes =
  | FetchEventDetailSuccessAction
  | FetchSimilarEventsSuccessAction
  | ResetEventDetailAction;
