import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";

const getEvents = (state: IState) => state.events;

export const selectEventsTotal = (state: IState) =>
  state.events.result.totalItems;

export const selectEvents = createSelector(
  getEvents,
  eventsState => eventsState.result.events
);

export const selectEventsError = createSelector(
  getEvents,
  eventsState => eventsState.error
);

export const selectEventsIsLoading = createSelector(
  getEvents,
  eventsState => eventsState.isLoading
);
