import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";

const getEvent = (state: IState) => state.eventDetail;

export const selectEventDetail = createSelector(
  getEvent,
  eventsDetail => eventsDetail
);
