import { combineReducers } from "redux";

import { IAction } from "redux/action";
import { IEvent } from "./types";
import { actionTypes as eventsActions } from "./constants";

type IErrorPayload = true | false;

function error(state = false, { type, payload }: IAction<IErrorPayload>) {
  switch (type) {
    case eventsActions.FETCH_EVENTS_ERROR:
      return payload;

    case eventsActions.FETCH_EVENTS:
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return false;

    default:
      return state;
  }
}

type IResultState = { events: IEvent[]; totalItems: number };

const ResultDefaultState = {
  events: [],
  totalItems: 0
};

function result(
  state: IResultState = ResultDefaultState,
  { type, payload }: IAction<IResultState>
) {
  switch (type) {
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return payload;

    default:
      return state;
  }
}

type IsLoadingPayload = true | false;

function isLoading(state = false, { type }: IAction<IsLoadingPayload>) {
  switch (type) {
    case eventsActions.FETCH_EVENTS:
      return true;

    default:
      return false;
  }
}

export interface IEventsReducerState {
  isLoading: boolean;
  error: boolean;
  result: IResultState;
}

export default combineReducers({ error, result, isLoading });
