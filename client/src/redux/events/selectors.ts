import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";
import { selectUserRole, selectUserId } from "redux/user/selectors";
import { selectEventDetail } from "redux/eventDetail/selectors";
import { IEvent } from "redux/events/types";

const getEvents = (state: IState) => state.events;

export const selectEventsTotal = (state: IState): number =>
  state.events.result.totalItems;

export const selectEvents = createSelector(
  getEvents,
  (eventsState): IEvent[] => eventsState.result.events
);

export const selectEventsError = createSelector(
  getEvents,
  (eventsState): null | number => eventsState.error
);

export const selectEventsIsLoading = createSelector(
  getEvents,
  (eventsState): boolean => eventsState.isLoading
);

export const makeSelectHasRightToEditEvent = (ownerId: string) =>
  createSelector(selectUserId, selectUserRole, (userId, userRole): boolean => {
    return userRole === "admin" || userId === ownerId;
  });

export const makeSelectHasRightToDeleteEvent = (ownerId: string) =>
  createSelector(selectUserId, selectUserRole, (userId, userRole): boolean => {
    return userRole === "admin" || userId === ownerId;
  });

export const selectHasAccessPermission = createSelector(
  [selectUserId, selectUserRole, selectEventDetail],
  (userId, userRole, event): boolean => {
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
  (myEvents): IEvent[] => myEvents.result
);

export const selectMyEventsError = createSelector(
  [selectMyEvents],
  (myEvents): null | number => myEvents.error
);

export const selectMyEventsIsLoading = createSelector(
  [selectMyEvents],
  (myEvents): boolean => myEvents.isLoading
);

export const selectSearch = createSelector(
  [getEvents],
  events => events.search
);

export const selectSearchTerm = createSelector(
  [selectSearch],
  (search): string => search.term || ""
);

export const selectSearchCity = createSelector(
  [selectSearch],
  (search): string => search.city || "all"
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
