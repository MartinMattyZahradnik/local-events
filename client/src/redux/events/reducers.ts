import { combineReducers } from "redux";

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

type IResultState = {
  events: IEvent[];
  totalItems: number;
};

const ResultDefaultState = {
  events: [],
  totalItems: 0
};

function result(
  state: IResultState = ResultDefaultState,
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
  search: ISearchEventsReducerState;
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

export interface ISearchEventsReducerState {
  city: string;
  term: string;
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

export default combineReducers({ error, result, isLoading, myEvents, search });
