import { combineReducers } from "redux";

import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_EVENT_DETAIL_ERROR,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS_SUCCESS,
} from "./constants";
import { IResultState } from "./types";

import {
  EventDetailErrorReducerTypes,
  EventDetailLoadingReducerTypes,
  EventDetailResultReducerTypes,
} from "./types";

function error(
  state: null | number = null,
  action: EventDetailErrorReducerTypes
) {
  switch (action.type) {
    case FETCH_EVENT_DETAIL_ERROR:
      return action.payload.statusCode;

    case FETCH_EVENT_DETAIL:
    case FETCH_EVENT_DETAIL_SUCCESS:
    case RESET_EVENT_DETAIL:
      return null;

    default:
      return state;
  }
}

function result(
  state: IResultState = null,
  action: EventDetailResultReducerTypes
) {
  switch (action.type) {
    case FETCH_EVENT_DETAIL_SUCCESS:
      return action.payload;

    case FETCH_SIMILAR_EVENTS_SUCCESS:
      return state
        ? {
            ...state,
            similarEvents: action.payload.events,
          }
        : null;

    case RESET_EVENT_DETAIL:
      return null;

    default:
      return state;
  }
}

function isLoading(state = false, action: EventDetailLoadingReducerTypes) {
  switch (action.type) {
    case FETCH_EVENT_DETAIL:
      return true;

    case RESET_EVENT_DETAIL:
    case FETCH_EVENT_DETAIL_SUCCESS:
    case FETCH_EVENT_DETAIL_ERROR:
      return false;

    default:
      return state;
  }
}

export interface IEventsReducerState {
  isLoading: boolean;
  error: null | number;
  result: IResultState;
}

export const defaultState = {
  error: null,
  result: null,
  isLoading: false,
};

export default combineReducers({ error, result, isLoading });
