import { IUser } from "redux/user/types";
import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  FETCH_EVENTS_BY_USER_ID,
  FETCH_EVENTS_BY_USER_ID_SUCCESS,
  FETCH_EVENTS_BY_USER_ID_ERROR,
  SET_SEARCH_TERM,
  SET_SEARCH_CITY
} from "./constants";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: number;
  imageUrl: string;
  images?: string[];
  category: [string];
  attendants?: string[];
  similarEvents?: IEvent[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    countryCode: string;
    country: string;
  };
  owner: IUser;
  price: {
    price: number;
    currency: string;
    locale: string;
  };
  tags: string[];
  coordinates?: [number, number];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}

export type FetchEventsPayload = { pageNumber: number; perPage: number };

export interface ICreateEventActionPayload {
  name: string;
  description: string;
  date: number;
  imageUrl: string;
  images?: string[];
  category: string[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    countryCode: string;
    country?: string;
  };
  price: {
    price: number;
    currency: string;
    locale: string;
  };
  tags: string[];
  coordinates?: [number, number];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}

export interface FetchEventsAction {
  type: typeof FETCH_EVENTS;
  payload: { pageNumber: number; perPage: number };
}

export interface FetchEventsSuccessAction {
  type: typeof FETCH_EVENTS_SUCCESS;
  payload: {
    events: IEvent[];
    totalItems: number;
  };
}

export interface FetchEventsErrorAction {
  type: typeof FETCH_EVENTS_ERROR;
  payload: { statusCode: number };
}

export interface CreateEventAction {
  type: typeof CREATE_EVENT;
  payload: { eventData: any };
}

export interface CreateEventSuccessAction {
  type: typeof CREATE_EVENT_SUCCESS;
  payload: { eventData: IEvent };
}

export interface CreateEventErrorAction {
  type: typeof CREATE_EVENT_ERROR;
  payload: { statusCode: number };
}

export interface UpdateEventAction {
  type: typeof UPDATE_EVENT;
  payload: { eventId: string; formValues: any };
}

export interface UpdateEventSuccessAction {
  type: typeof UPDATE_EVENT_SUCCESS;
  payload: { eventData: IEvent };
}

export interface UpdateEventErrorAction {
  type: typeof UPDATE_EVENT_ERROR;
  payload: { statusCode: number };
}

export interface DeleteEventAction {
  type: typeof DELETE_EVENT;
  payload: { id: string };
}

export interface DeleteEventSuccessAction {
  type: typeof DELETE_EVENT_SUCCESS;
  payload: { id: string };
}

export interface DeleteEventErrorAction {
  // type: typeof actionTypes.DELETE_EVENT_ERROR;
  type: typeof DELETE_EVENT_ERROR;
  payload: { statusCode: number };
}

export interface FetchEventsByUserIdAction {
  type: typeof FETCH_EVENTS_BY_USER_ID;
  payload: { userId: string };
}

export interface FetchEventsByUserIdSuccessAction {
  type: typeof FETCH_EVENTS_BY_USER_ID_SUCCESS;
  payload: { events: IEvent[] };
}

export interface FetchEventsByUserIdErrorAction {
  type: typeof FETCH_EVENTS_BY_USER_ID_ERROR;
  payload: { statusCode: number };
}

export interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: { searchTerm: string };
}

export interface SetSearchCityAction {
  type: typeof SET_SEARCH_CITY;
  payload: { searchCity: string };
}

export type EventsResultReducerTypes =
  | FetchEventsSuccessAction
  | CreateEventSuccessAction
  | UpdateEventSuccessAction
  | DeleteEventSuccessAction;

export type EventLoadingLoadingTypes = FetchEventsAction;

export type EventErrorReducerTypes =
  | FetchEventsErrorAction
  | FetchEventsAction
  | FetchEventsSuccessAction;

export type MyEventsReducerTypes =
  | DeleteEventSuccessAction
  | FetchEventsByUserIdAction
  | FetchEventsByUserIdSuccessAction
  | FetchEventsByUserIdErrorAction;

export type EventsSearchReducerTypes =
  | SetSearchTermAction
  | SetSearchCityAction;
