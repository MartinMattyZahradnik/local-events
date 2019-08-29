import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";

const getEvents = (state: IState) => state.events;

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
