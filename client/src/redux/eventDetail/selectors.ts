import { createSelector } from "reselect";
import get from "lodash.get";

import { IState } from "redux/rootReducer";

const getEventDetail = (state: IState) => state.eventDetail;

export const selectEventDetail = createSelector(
  getEventDetail,
  eventsDetail => eventsDetail.result
);

export const selectEventDetailLoading = createSelector(
  getEventDetail,
  eventsDetail => eventsDetail.isLoading
);

export const selectEventDetailError = createSelector(
  getEventDetail,
  eventsDetail => eventsDetail.error
);

export const selectSimilarEvents = createSelector(
  getEventDetail,
  eventDetail => get(eventDetail, "result.similarEvents", [])
);
