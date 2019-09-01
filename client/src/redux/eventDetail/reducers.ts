import { combineReducers } from "redux";

import { IAction } from "redux/action";
import { actionTypes as eventsActions } from "./constants";
import { IResultState } from "./types";

type IErrorPayload = true | false;

function error(state = false, { type, payload }: IAction<IErrorPayload>) {
  switch (type) {
    case eventsActions.FETCH_EVENT_DETAIL_ERROR:
      return payload;

    case eventsActions.FETCH_EVENT_DETAIL:
    case eventsActions.FETCH_EVENT_DETAIL_SUCCESS:
    case eventsActions.RESET_EVENT_DETAIL:
      return false;

    default:
      return state;
  }
}

function result(
  state: IResultState = null,
  // { type, payload }: IAction<IResultState>
  { type, payload }: any
) {
  switch (type) {
    case eventsActions.FETCH_EVENT_DETAIL_SUCCESS:
      return payload;

    case eventsActions.FETCH_SIMILAR_EVENTS_SUCCESS:
      return {
        ...state,
        similarEvents: payload.events
      };

    case eventsActions.RESET_EVENT_DETAIL:
      return null;

    default:
      return state;
  }
}

type IsLoadingPayload = true | false;

function isLoading(state = false, { type }: IAction<IsLoadingPayload>) {
  switch (type) {
    case eventsActions.FETCH_EVENT_DETAIL:
      return true;

    case eventsActions.RESET_EVENT_DETAIL:
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
