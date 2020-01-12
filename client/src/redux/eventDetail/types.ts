import { IUser } from "redux/user/types";
import {
  FETCH_EVENT_DETAIL,
  FETCH_EVENT_DETAIL_SUCCESS,
  FETCH_SIMILAR_EVENTS_SUCCESS,
  RESET_EVENT_DETAIL,
  FETCH_SIMILAR_EVENTS
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
  coordinates: [number, number];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}

export type IResultState = IEvent | null;

export type IEventDetailReducerState = {
  result: IResultState;
  error: boolean;
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
