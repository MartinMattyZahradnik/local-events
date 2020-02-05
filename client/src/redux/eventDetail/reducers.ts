import { combineReducers } from "redux";

import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_EVENT_DETAIL_ERROR,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS_SUCCESS
} from "./constants";
import { IResultState } from "./types";

import {
  EventDetailErrorReducerTypes,
  EventDetailLoadingReducerTypes,
  EventDetailResultReducerTypes
} from "./types";

function error(state = false, action: EventDetailErrorReducerTypes) {
  switch (action.type) {
    case FETCH_EVENT_DETAIL_ERROR:
      return action.payload;

    case FETCH_EVENT_DETAIL:
    case FETCH_EVENT_DETAIL_SUCCESS:
    case RESET_EVENT_DETAIL:
      return false;

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
      return {
        ...state,
        similarEvents: action.payload.events
      };

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

export const defaultState = {
  error: false,
  result: null,
  isLoading: false
};

export default combineReducers({ error, result, isLoading });
