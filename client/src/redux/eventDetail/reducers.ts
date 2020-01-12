import { combineReducers } from "redux";

import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_EVENT_DETAIL_ERROR,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS_SUCCESS
} from "./constants";
import { IResultState } from "./types";

function error(state = false, { type, payload }: any) {
  switch (type) {
    case FETCH_EVENT_DETAIL_ERROR:
      return payload;

    case FETCH_EVENT_DETAIL:
    case FETCH_EVENT_DETAIL_SUCCESS:
    case RESET_EVENT_DETAIL:
      return false;

    default:
      return state;
  }
}

function result(state: IResultState = null, { type, payload }: any) {
  switch (type) {
    case FETCH_EVENT_DETAIL_SUCCESS:
      return payload;

    case FETCH_SIMILAR_EVENTS_SUCCESS:
      return {
        ...state,
        similarEvents: payload.events
      };

    case RESET_EVENT_DETAIL:
      return null;

    default:
      return state;
  }
}

function isLoading(state = false, { type }: any) {
  switch (type) {
    case FETCH_EVENT_DETAIL:
      return true;

    case RESET_EVENT_DETAIL:
      return false;

    default:
      return state;
  }
}

export interface IEventsReducerState {
  isLoading: boolean;
  error: boolean;
  result: IResultState;
}

export default combineReducers({ error, result, isLoading });
