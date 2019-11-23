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
  { type, payload }: { type: string; payload: any } | IAction<IResultState>
) {
  switch (type) {
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return payload;

    case eventsActions.CREATE_EVENT_SUCCESS:
      return {
        events: [payload.eventData, ...state.events],
        totalItems: state.totalItems + 1
      };

    case eventsActions.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event._id !== payload.id),
        totalItems: state.totalItems - 1
      };

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
  myEvents: {
    isLoading: boolean;
    error: boolean;
    result: IEvent[];
  };
}

export interface IMyEventsReducerState {
  isLoading: boolean;
  error: boolean;
  result: IEvent[];
}

const MyEventsDefaultState = {
  isLoading: false,
  error: false,
  result: []
};

function myEvents(
  state: IMyEventsReducerState = MyEventsDefaultState,
  { type, payload }: { type: string; payload: any } | IAction<IEvent[]>
) {
  switch (type) {
    case eventsActions.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        result: state.result.filter(userEvent => userEvent._id !== payload.id)
      };

    case eventsActions.FETCH_EVENTS_BY_USER_ID:
      return {
        ...state,
        isLoading: true,
        error: false
      };

    case eventsActions.FETCH_EVENTS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        result: payload.events,
        isLoading: false,
        error: false
      };

    case eventsActions.FETCH_EVENTS_BY_USER_ID_ERROR:
      return {
        ...state,
        result: [],
        isLoading: false,
        error: true
      };

    default:
      return state;
  }
}

export default combineReducers({ error, result, isLoading, myEvents });
