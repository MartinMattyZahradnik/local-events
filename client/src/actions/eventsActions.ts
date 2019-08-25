import { createSelector } from "reselect";

export const actionTypes = {
  FETCH_EVENTS: "events/FETCH_EVENTS",
  FETCH_EVENTS_SUCCESS: "events/FETCH_EVENTS_SUCCESS",
  FETCH_EVENTS_ERROR: "events/FETCH_EVENTS_ERROR"
};

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: number;
  imageUrl: string;
  images?: string[];
  category: [string];
  attendants?: string[];
  similiarEvents?: string[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    countryCode: string;
    country: string;
  };
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

export const fetchEvents = () => ({
  type: actionTypes.FETCH_EVENTS
});

export const fetchEventsSuccess = (payload: IEvent[]) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload
});

export const fetchEventsError = (payload: any) => ({
  type: actionTypes.FETCH_EVENTS_ERROR,
  payload
});

const getEvents = (state: any) => state.events;

export const selectEvents = createSelector(
  getEvents,
  eventsState => eventsState.result
);

export const selectEventsError = createSelector(
  getEvents,
  eventsState => eventsState.error
);

export const selectEventsIsLoading = createSelector(
  getEvents,
  eventsState => eventsState.isLoading
);
