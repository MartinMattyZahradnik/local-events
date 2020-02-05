import { combineReducers } from "redux";
import { IResultState, ISearchEventsReducerState } from "./types";

import {
  IEvent,
  EventsResultReducerTypes,
  EventLoadingLoadingTypes,
  EventErrorReducerTypes,
  EventsSearchReducerTypes,
  MyEventsReducerTypes
} from "./types";
import {
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  FETCH_EVENTS_BY_USER_ID,
  FETCH_EVENTS_BY_USER_ID_SUCCESS,
  FETCH_EVENTS_BY_USER_ID_ERROR,
  SET_SEARCH_TERM,
  SET_SEARCH_CITY
} from "./constants";

function error(state: null | number = null, action: EventErrorReducerTypes) {
  switch (action.type) {
    case FETCH_EVENTS_ERROR:
      return action.payload.statusCode;

    case FETCH_EVENTS:
    case FETCH_EVENTS_SUCCESS:
      return null;

    default:
      return state;
  }
}

const resultDefaultState = {
  events: [],
  totalItems: 0
};

function result(
  state: IResultState = resultDefaultState,
  action: EventsResultReducerTypes
) {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload;

    case CREATE_EVENT_SUCCESS:
      return {
        events: [action.payload.eventData, ...state.events],
        totalItems: state.totalItems + 1
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload.id),
        totalItems: state.totalItems - 1
      };

    default:
      return state;
  }
}

function isLoading(state = false, action: EventLoadingLoadingTypes) {
  switch (action.type) {
    case FETCH_EVENTS:
      return true;

    case FETCH_EVENTS_SUCCESS:
    case FETCH_EVENTS_ERROR:
      return false;

    default:
      return state;
  }
}

export interface IMyEventsReducerState {
  isLoading: boolean;
  error: null | number;
  result: IEvent[];
}

const MyEventsDefaultState = {
  isLoading: false,
  error: null,
  result: []
};

function myEvents(
  state: IMyEventsReducerState = MyEventsDefaultState,
  action: MyEventsReducerTypes
) {
  switch (action.type) {
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        result: state.result.filter(
          userEvent => userEvent._id !== action.payload.id
        )
      };

    case FETCH_EVENTS_BY_USER_ID:
      return {
        ...state,
        isLoading: true,
        error: false
      };

    case FETCH_EVENTS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        result: action.payload.events,
        isLoading: false,
        error: false
      };

    case FETCH_EVENTS_BY_USER_ID_ERROR:
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

const searchReducerDefaultState = {
  city: "all",
  term: ""
};

function search(
  state: ISearchEventsReducerState = searchReducerDefaultState,
  action: EventsSearchReducerTypes
) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.payload.searchTerm
      };

    case SET_SEARCH_CITY:
      return {
        ...state,
        city: action.payload.searchCity
      };

    default:
      return state;
  }
}

export const defaultState = {
  error: null,
  result: resultDefaultState,
  isLoading: false,
  myEvents: MyEventsDefaultState,
  search: searchReducerDefaultState
};

export default combineReducers({ error, result, isLoading, myEvents, search });
