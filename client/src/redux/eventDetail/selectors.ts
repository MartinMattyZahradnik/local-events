import { createSelector } from "reselect";
import get from "lodash.get";

import { IState } from "redux/rootReducer";
import { IEvent } from "redux/events/types";
import { IEventFormValues } from "redux/events/types";

const getEventDetail = (state: IState) => state.eventDetail;

export const selectEventDetail = createSelector(
  getEventDetail,
  (eventsDetail): IEvent | null => eventsDetail.result
);

export const selectEventForUpdateForm = createSelector(
  selectEventDetail,
  (event): IEventFormValues | null =>
    event
      ? {
          ...event,
          price: event.price.price,
          coordinates: event.coordinates
            ? event.coordinates
                .map(coordinate => coordinate.toString())
                .join(",")
            : "",
          tags: event.tags.join("")
        }
      : null
);

export const selectEventDetailLoading = createSelector(
  getEventDetail,
  (eventsDetail): boolean => eventsDetail.isLoading
);

export const selectEventDetailError = createSelector(
  getEventDetail,
  (eventsDetail): boolean | number => eventsDetail.error
);

export const selectSimilarEvents = createSelector(getEventDetail, eventDetail =>
  get(eventDetail, "result.similarEvents", [])
);
