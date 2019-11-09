import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";
import { selectUserRole, selectUserId } from "redux/user/selectors";

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
  createSelector(
    selectUserId,
    selectUserRole,
    (userId, userRole) => {
      if (!userId) {
        return false;
      }

      if (userRole === "admin" || userId === ownerId) {
        return true;
      }

      return false;
    }
  );

export const selectEventCategories = createSelector(
  getEvents,
  () => {
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
  }
);
