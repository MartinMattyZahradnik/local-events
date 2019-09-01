import { createSelector } from "reselect";
import get from "lodash.get";

import { IState } from "redux/rootReducer";

const getEvent = (state: IState) => state.eventDetail;

export const selectEventDetail = createSelector(
  getEvent,
  eventsDetail => eventsDetail
);

export const selectSimilarEvents = createSelector(
  getEvent,
  eventDetail => get(eventDetail, "result.similarEvents", [])
);
