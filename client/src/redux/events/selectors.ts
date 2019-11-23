import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";
import { selectUserRole, selectUserId } from "redux/user/selectors";
import { selectEventDetail } from "redux/eventDetail/selectors";

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

export const makeSelectHasRightToEditEvent = (ownerId: string) =>
  createSelector(selectUserId, selectUserRole, (userId, userRole) => {
    return userRole === "admin" || userId === ownerId;
  });

export const selectHasAccessPermission = createSelector(
  [selectUserId, selectUserRole, selectEventDetail],
  (userId, userRole, event) => {
    if (!event) {
      return false;
    }

    return userRole === "admin" || event.owner._id === userId;
  }
);

export const selectMyEvents = createSelector(
  [getEvents],
  events => events.myEvents
);

export const selectMyEventsResult = createSelector(
  [selectMyEvents],
  myEvents => myEvents.result
);

export const selectMyEventsError = createSelector(
  [selectMyEvents],
  myEvents => myEvents.error
);

export const selectMyEventsIsLoading = createSelector(
  [selectMyEvents],
  myEvents => myEvents.isLoading
);

export const selectEventCategories = createSelector(getEvents, () => {
  // Todo - move this to separate DB table
  // and load categories as API call
  return [
    "other",
    "music",
    "art",
    "business",
    "parties",
    "classes",
    "sport",
    "wellness",
    "food",
    "fun",
    "movie",
    "party",
    "family",
    "outdoor",
    "nature"
  ];
});
