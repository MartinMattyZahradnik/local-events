import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";

const getNotifications = (state: IState) => state.notifications;

export const selectNotificationList = createSelector(
  [getNotifications],
  notifications => notifications.list
);
